import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'clients.store': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
    'clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoice_settings.show': { paramsTuple?: []; params?: {} }
    'invoice_settings.update': { paramsTuple?: []; params?: {} }
    'invoices.store': { paramsTuple?: []; params?: {} }
    'invoices.index': { paramsTuple?: []; params?: {} }
    'invoices.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.issue': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.generate_pdf': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.download': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.mark_paid': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
    'clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoice_settings.show': { paramsTuple?: []; params?: {} }
    'invoices.index': { paramsTuple?: []; params?: {} }
    'invoices.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.download': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
    'clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoice_settings.show': { paramsTuple?: []; params?: {} }
    'invoices.index': { paramsTuple?: []; params?: {} }
    'invoices.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.download': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'clients.store': { paramsTuple?: []; params?: {} }
    'invoices.store': { paramsTuple?: []; params?: {} }
    'invoices.issue': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.generate_pdf': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.mark_paid': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoice_settings.update': { paramsTuple?: []; params?: {} }
    'invoices.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}