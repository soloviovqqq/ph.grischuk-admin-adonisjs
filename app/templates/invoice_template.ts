import type Client from '#models/client'
import type Invoice from '#models/invoice'
import type InvoiceItem from '#models/invoice_item'
import type InvoiceSetting from '#models/invoice_setting'

type InvoiceTemplateData = {
  invoice: Invoice
  client: Client
  settings: InvoiceSetting
  items: InvoiceItem[]
}

const moneyFormatter = new Intl.NumberFormat('de-AT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('de-AT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function line(value: string | null | undefined, label?: string) {
  if (!value) {
    return ''
  }

  return `<div>${label ? `${escapeHtml(label)}: ` : ''}${escapeHtml(value)}</div>`
}

function formatMoney(cents: number | null | undefined) {
  if (cents === null || cents === undefined) {
    return ''
  }

  return moneyFormatter.format(cents / 100)
}

function formatDate(value: Invoice['issueDate']) {
  return dateFormatter.format(value.toJSDate())
}

export function renderInvoiceTemplate({ invoice, client, settings, items }: InvoiceTemplateData) {
  const invoiceNumber = invoice.invoiceNumberString ?? 'Entwurf'
  const clientAddress = [
    client.addressLine1,
    client.addressLine2,
    `${client.zip} ${client.city}`,
    client.country,
  ]
    .filter(Boolean)
    .map((value) => `<div>${escapeHtml(value)}</div>`)
    .join('')

  const itemRows = items
    .map((item) => {
      return `
        <tr>
          <td class="quantity">${item.quantity ?? ''}</td>
          <td>${escapeHtml(item.description)}</td>
          <td class="money">${formatMoney(item.unitPrice)}</td>
          <td class="money">${formatMoney(item.totalPrice)}</td>
        </tr>
      `
    })
    .join('')

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Rechnung ${escapeHtml(invoiceNumber)}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: #171717;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11.5px;
      line-height: 1.45;
      background: #ffffff;
    }

    .invoice {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .top {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 24px;
      align-items: start;
      border-bottom: 2px solid #171717;
      padding-bottom: 18px;
    }

    h1 {
      margin: 0 0 18px;
      font-size: 25px;
      line-height: 1;
      font-weight: 700;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .business {
      font-size: 11px;
      text-align: right;
      min-width: 220px;
    }

    .business strong,
    .client strong,
    .bank strong {
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
    }

    .blocks {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 36px;
      align-items: start;
    }

    .client {
      padding-top: 2px;
    }

    .meta {
      width: 100%;
      border-collapse: collapse;
    }

    .meta td {
      padding: 2px 0 6px;
      vertical-align: top;
    }

    .meta td:first-child {
      width: 112px;
      color: #555;
    }

    .intro {
      margin: 0;
    }

    table.items {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .items th {
      padding: 8px 8px;
      border-top: 1px solid #171717;
      border-bottom: 1px solid #171717;
      text-align: left;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .items td {
      padding: 9px 8px;
      border-bottom: 1px solid #e2e2e2;
      vertical-align: top;
    }

    .items .quantity {
      width: 64px;
      text-align: right;
    }

    .items .money {
      width: 118px;
      text-align: right;
      white-space: nowrap;
    }

    .sum {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 28px;
      padding-top: 10px;
      font-size: 13px;
      font-weight: 700;
    }

    .payment {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      padding-top: 4px;
    }

    .small-business {
      border-top: 1px solid #171717;
      border-bottom: 1px solid #171717;
      padding: 10px 0;
      font-weight: 700;
    }

    .closing {
      margin-top: auto;
      padding-top: 18px;
    }
  </style>
</head>
<body>
  <main class="invoice">
    <section class="top">
      <div>
        <h1>RECHNUNG ${escapeHtml(invoiceNumber)}</h1>
      </div>
      <div class="business">
        <strong>${escapeHtml(settings.businessName)}</strong>
        ${line(settings.addressLine1)}
        ${line(settings.addressLine2)}
        <div>${escapeHtml(settings.zip)} ${escapeHtml(settings.city)}, ${escapeHtml(settings.country)}</div>
        ${line(settings.phone, 'Telefon')}
        ${line(settings.email, 'E-Mail')}
        ${line(settings.taxNumber, 'Steuernummer')}
        ${line(settings.gisaNumber, 'GISA Zahl')}
      </div>
    </section>

    <section class="blocks">
      <div class="client">
        <strong>Kunde:</strong>
        <div>${escapeHtml(client.name)}</div>
        ${clientAddress}
        ${line(client.email, 'E-Mail')}
      </div>

      <table class="meta">
        <tbody>
          <tr>
            <td>Zahlungsart</td>
            <td>${escapeHtml(invoice.paymentMethod)}</td>
          </tr>
          <tr>
            <td>Datum</td>
            <td>${formatDate(invoice.issueDate)}</td>
          </tr>
          ${
            invoice.serviceDate
              ? `<tr><td>Leistungsdatum</td><td>${formatDate(invoice.serviceDate)}</td></tr>`
              : ''
          }
        </tbody>
      </table>
    </section>

    <p class="intro">Hiermit stelle ich Ihnen in Rechnung folgende Leistung:</p>

    <section>
      <table class="items">
        <thead>
          <tr>
            <th class="quantity">Anzahl</th>
            <th>Beschreibung</th>
            <th class="money">Einzelpreis €</th>
            <th class="money">Gesamt €</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <div class="sum">
        <span>Summe €</span>
        <span>${formatMoney(invoice.totalAmount)}</span>
      </div>
    </section>

    <section class="payment">
      <div>
        Die Zahlung ist innerhalb von ${escapeHtml(
          invoice.paymentDueDays
        )} Tagen nach Leistungserbringung auf folgendes Konto zu tätigen:
      </div>
      <div class="bank">
        <strong>Bankverbindung</strong>
        ${line(settings.iban, 'IBAN')}
        ${line(settings.bic, 'BIC')}
        ${line(settings.bankAccountName, 'Empfänger')}
        ${line(settings.bankName, 'Bank')}
      </div>
    </section>

    <section class="small-business">${escapeHtml(settings.smallBusinessText)}</section>

    <section class="closing">
      <div>Danke für Ihren Auftrag!</div>
      <br />
      <div>Mit freundlichen Grüßen,</div>
      <div>${escapeHtml(settings.businessName)}</div>
    </section>
  </main>
</body>
</html>`
}
