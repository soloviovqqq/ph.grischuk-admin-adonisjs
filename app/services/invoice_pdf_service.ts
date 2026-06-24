import Invoice from '#models/invoice'
import InvoiceSetting from '#models/invoice_setting'
import HttpError from '#services/http_error'
import { renderInvoiceTemplate } from '#templates/invoice_template'
import app from '@adonisjs/core/services/app'
import { chromium, type Browser } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

export default class InvoicePdfService {
  static async generateAndPersist(invoiceId: number) {
    const invoice = await Invoice.query()
      .where('id', invoiceId)
      .preload('client')
      .preload('items', (itemsQuery) => itemsQuery.orderBy('sort_order', 'asc'))
      .first()

    if (!invoice) {
      throw new HttpError(404, 'Invoice not found')
    }

    if (!invoice.invoiceNumberString || !invoice.invoiceYear) {
      throw new HttpError(409, 'Invoice must be issued before PDF generation')
    }

    if (!invoice.client) {
      throw new HttpError(422, 'Invoice must have a client before PDF generation')
    }

    if (invoice.items.length === 0) {
      throw new HttpError(422, 'Invoice must have at least one item before PDF generation')
    }

    const settings = await InvoiceSetting.first()
    if (!settings) {
      throw new HttpError(422, 'Invoice settings must be configured before PDF generation')
    }

    const html = renderInvoiceTemplate({
      invoice,
      client: invoice.client,
      settings,
      items: invoice.items,
    })

    const relativePath = this.relativePath(invoice)
    const absolutePath = this.absolutePath(relativePath)
    await mkdir(path.dirname(absolutePath), { recursive: true })

    let browser: Browser | null = null
    try {
      browser = await chromium.launch({ headless: true })
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle' })
      await page.pdf({
        path: absolutePath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '18mm',
          right: '18mm',
          bottom: '18mm',
          left: '18mm',
        },
      })
      await page.close()
    } finally {
      await browser?.close()
    }

    invoice.pdfPath = relativePath
    await invoice.save()

    return relativePath
  }

  static absolutePath(relativePath: string) {
    return app.makePath(...relativePath.split('/'))
  }

  private static relativePath(invoice: Invoice) {
    const fileName = `${invoice.invoiceNumberString!.replace('/', '-')}.pdf`

    return ['storage', 'invoices', String(invoice.invoiceYear), fileName].join('/')
  }
}
