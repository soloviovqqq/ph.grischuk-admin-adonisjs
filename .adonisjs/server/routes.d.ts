import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'clients.list': { paramsTuple?: []; params?: {} }
    'clients.store': { paramsTuple?: []; params?: {} }
    'clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invoices.list': { paramsTuple?: []; params?: {} }
    'invoices.store': { paramsTuple?: []; params?: {} }
    'invoices.generate_pdf': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'clients.list': { paramsTuple?: []; params?: {} }
    'invoices.list': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'clients.list': { paramsTuple?: []; params?: {} }
    'invoices.list': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'clients.store': { paramsTuple?: []; params?: {} }
    'invoices.store': { paramsTuple?: []; params?: {} }
    'invoices.generate_pdf': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}