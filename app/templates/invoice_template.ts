import type Client from '#models/client'
import type Invoice from '#models/invoice'
import type InvoiceItem from '#models/invoice_item'

type InvoiceTemplateData = {
  invoice: Invoice
  client: Client
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

export function renderInvoiceTemplate({ invoice, client, items }: InvoiceTemplateData) {
  const clientAddress = [client.address, `${client.zip} ${client.city}`, client.country]
    .filter(Boolean)
    .map((value) => `<div>${escapeHtml(value)}</div>`)
    .join('')

  const itemRows = items
    .map((item) => {
      return `
        <tr>
          <td class="quantity"> </td>
          <td>${escapeHtml(item.description)}</td>
          <td class="money">${formatMoney(item.price)}</td>
          <td class="money">${formatMoney(item.price)}</td>
        </tr>
      `
    })
    .join('')

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Rechnung ${escapeHtml(invoice.number)}/${escapeHtml(invoice.year)} </title>
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
      padding: 8px 0;
      border-top: 1px solid #171717;
      border-bottom: 1px solid #171717;
      text-align: left;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .items td {
      padding: 9px 0;
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
        <h1>Rechnung ${escapeHtml(invoice.number)}/${escapeHtml(invoice.year)}</h1>
      </div>
      <div class="business">
        <strong>Tatiana Grisciuc</strong>
        <div>Boerhaavegasse 8a/2/425</div>
        <div>1030, Wien, Österreich</div>
        <div>+43 660 0000000</div>
        <div>tatiana@example.com</div>
        <div>Steuernummer: 12 345/6789</div>
        <div>GISA Zahl: 12345678</div>
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
            <td>28.04.2026</td>
          </tr>

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
        Die Zahlung ist innerhalb von 7 Tagen nach Leistungserbringung auf folgendes Konto zu tätigen:
      </div>
      <div class="bank">
        <strong>Bankverbindung</strong>
        <div>IBAN: AT611904300234573201</div>
        <div>BIC: BKAUATWW</div>
        <div>Empfänger: Tatiana Grisciuc</div>
        <div>Bank: Bank Austria</div>
      </div>
    </section>

    <section class="small-business">Umsatzsteuerbefreiter Kleinunternehmer gemäß §6(1)27 UStG</section>

    <section class="closing">
      <div>Danke für Ihren Auftrag!</div>
      <br />
      <div>Mit freundlichen Grüßen,</div>
      <div>Tatiana Grisciuc</div>
    </section>
  </main>
</body>
</html>`
}
