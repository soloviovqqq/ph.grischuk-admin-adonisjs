/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  clients: {
    store: typeof routes['clients.store']
    index: typeof routes['clients.index']
    show: typeof routes['clients.show']
    update: typeof routes['clients.update']
    destroy: typeof routes['clients.destroy']
  }
  invoiceSettings: {
    show: typeof routes['invoice_settings.show']
    update: typeof routes['invoice_settings.update']
  }
  invoices: {
    store: typeof routes['invoices.store']
    index: typeof routes['invoices.index']
    show: typeof routes['invoices.show']
    update: typeof routes['invoices.update']
    destroy: typeof routes['invoices.destroy']
    issue: typeof routes['invoices.issue']
    generatePdf: typeof routes['invoices.generate_pdf']
    download: typeof routes['invoices.download']
    markPaid: typeof routes['invoices.mark_paid']
    cancel: typeof routes['invoices.cancel']
  }
}
