/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  clients: {
    list: typeof routes['clients.list']
    store: typeof routes['clients.store']
    update: typeof routes['clients.update']
    destroy: typeof routes['clients.destroy']
  }
  invoices: {
    list: typeof routes['invoices.list']
    store: typeof routes['invoices.store']
    templatePreview: typeof routes['invoices.template_preview']
    generatePdf: typeof routes['invoices.generate_pdf']
  }
}
