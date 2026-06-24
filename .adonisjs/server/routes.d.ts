import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'list': { paramsTuple?: []; params?: {} }
    'store': { paramsTuple?: []; params?: {} }
    'update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'list': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'list': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}