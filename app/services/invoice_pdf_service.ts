import type Invoice from '#models/invoice'
import { renderInvoiceTemplate } from '#templates/invoice_template'
import app from '@adonisjs/core/services/app'
import { chromium, type Browser } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

export default class InvoicePdfService {
  static async generateAndPersist(invoice: Invoice) {
    const html = renderInvoiceTemplate({
      invoice,
      client: invoice.client,
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
    const fileName = `${invoice.number.toString().replace('/', '-')}.pdf`

    return ['storage', 'invoices', String(invoice.year), fileName].join('/')
  }
}
