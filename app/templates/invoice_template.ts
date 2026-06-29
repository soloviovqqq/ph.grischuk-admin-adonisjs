import type Client from '#models/client'
import type Invoice from '#models/invoice'
import type InvoiceItem from '#models/invoice_item'
import type InvoiceSetting from '#models/invoice_setting'

type InvoiceTemplateData = {
  invoice: Invoice
  client: Client
  settings?: InvoiceSetting | null
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

function formatDate(invoice: Invoice) {
  const date = invoice.issuedAt

  return dateFormatter.format(date.toJSDate())
}

function paymentMethodLabel(value: string) {
  const labels: Record<string, string> = {
    bank_transfer: 'Überweisung',
    cash: 'Barzahlung',
  }

  return labels[value] ?? value
}

export function renderInvoiceTemplate({ invoice, client, items }: InvoiceTemplateData) {
  const businessName = 'Tatiana Grisciuc'
  const addressLine1 = 'Boerhaavegasse 8a/2/425'
  const zip = '1030'
  const city = 'Wien'
  const country = 'Österreich'
  const phone = '+4368184681386'
  const email = 'grischuk.tanyaa@gmail.com'
  const taxNumber = '037428042'
  const gisaNumber = '38200847'

  const iban = 'AT51 2011 1841 7670 4200'
  const bic = 'GIBAATWWXXX'
  const bankAccountName = 'Tatiana Grisciuc'
  const bankName = 'ERSTE BANK'

  const clientAddress = [client.address, `${client.zip} ${client.city}`, client.country]
    .filter(Boolean)
    .map((value) => `<div>${escapeHtml(value)}</div>`)
    .join('')

  const itemRows = items
    .map((item) => {
      return `
        <tr>
          <td>${escapeHtml(item.description)}</td>
          <td class="quantity">${escapeHtml(item.quantity)}</td>
          <td class="money">${formatMoney(item.price)}</td>
          <td class="money">${formatMoney(item.total)}</td>
        </tr>
      `
    })
    .join('')

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Rechnung ${escapeHtml(invoice.number)}/${escapeHtml(invoice.year)}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 18mm 18mm 18mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: #111111;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.33;
      background: #ffffff;
    }

    .invoice {
      min-height: calc(297mm - 38mm);
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .top {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: 32px;
      align-items: start;
    }

    h1 {
      margin: 2px 0 10px;
      font-size: 24px;
      line-height: 1.14;
      font-weight: 700;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .business {
      font-size: 12px;
      text-align: left;
    }

    .client strong {
      display: inline;
      font-weight: 400;
    }

    .client {
      font-size: 12px;
      text-align: left;
      margin: 40px 0 ;
    }

    .intro {
      margin-bottom: 20px;
    }

    .meta {
      width: 56%;
      margin: 28px auto 50px;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .meta th {
      padding: 0 10px 8px 10px;
      border-bottom: 1px solid #111111;
      font-weight: 400;
      text-align: left;
    }

    .meta td {
      padding: 8px 10px 0 10px;
      vertical-align: top;
      text-align: left;
    }

    table.items {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .items th {
      padding: 0 0 5px 0;
      border-bottom: 1px solid #11111150;
      text-align: left;
      font-size: 13px;
      font-weight: 400;
    }

    .items td {
      padding: 5px 0;
      vertical-align: top;
    }
    .items tr {
      border-bottom: 1px solid #11111110;

    }

    .items tr:last-child {
      border-bottom: none;
    }

    .items .quantity {
      width: 70px;
      text-align: left;
    }

    .items .money {
      width: 145px;
      text-align: right;
      white-space: nowrap;
    }

    .sum-table {
      width: 35%;
      margin-left: auto;
      border-collapse: collapse;
      border-top: 1px solid #11111150;
    }

    .sum-table td {
      padding: 8px 0 0 0;
      font-size: 14px;
    }

    .sum-table .sum-label {
      font-weight: 700;
      text-align: left;
    }

    .sum-table .sum-amount {
      font-weight: 700;
      text-align: right;
    }

    .payment {
      margin-top: 60px;
    }

    .bank {
      margin-top: 15px;
    }

    .closing {
      font-size: 12px;
      margin-top: 40px;
    }

    .footer {
      position: fixed;
      right: 18mm;
      bottom: 12mm;
      font-size: 11px;
    }
  </style>
</head>

<body>
  <main class="invoice">
    <section class="top">
      <div>
        <h1>RECHNUNG ${escapeHtml(invoice.number)}/${escapeHtml(invoice.year)}</h1>
        <div>Zahlungsart: ${paymentMethodLabel(invoice.paymentMethod)}</div>
        <div>Datum: ${formatDate(invoice)}</div>
      </div>
      <div class="business">
        <div>${escapeHtml(businessName)}</div>
        <div>${escapeHtml(addressLine1)}</div>
        <div>${escapeHtml(zip)} ${escapeHtml(city)}, ${escapeHtml(country)}</div>
        ${line(String(phone), 'Telefon')}
        ${line(String(email), 'E-Mail')}
        ${line(String(taxNumber), 'Steuernummer')}
        ${line(String(gisaNumber), 'GISA Zahl')}
      </div>
    </section>

  <section class="top">
      <div></div>
      <section class="client">
        <b>Kunde:</b>
        <div>${escapeHtml(client.name)}</div>
        ${clientAddress}
        ${line(client.email, 'E-Mail')}
        ${line(client.phone, 'Telefon')}
      </section>
    </section>


    <p class="intro">Hiermit stelle ich Ihnen in Rechnung folgende Leistung:</p>

    <section>
      <table class="items">
        <thead>
          <tr>
            <th>Beschreibung</th>
            <th class="quantity">Anzahl</th>
            <th class="money">Einzelpreis €</th>
            <th class="money">Gesamt €</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <table class="sum-table">
        <tbody>
          <tr>
            <td class="sum-label">Summe</td>
            <td class="sum-amount">€ ${formatMoney(invoice.total)}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="payment">
      <div>
        Die Zahlung ist innerhalb von 7 Tagen nach Leistungserbringung auf folgendes Konto zu tätigen:
      </div>
      <div class="bank">
        <div>${escapeHtml(iban)}</div>
        <div>BIC: ${escapeHtml(bic)}</div>
        <div>${escapeHtml(bankAccountName)}</div>
        <div>${escapeHtml(bankName)}</div>
      </div>
    </section>

    <section class="closing">
      <div>Umsatzsteuerbefreiter Kleinunternehmer gemäß §6(1)27 UStG</div>
      <div>Danke für Ihren Auftrag!</div>
      <div>Mit freundlichen Grüßen,</div>
      <div>${escapeHtml(businessName)}</div>
    </section>
  </main>
</body>
</html>`
}
