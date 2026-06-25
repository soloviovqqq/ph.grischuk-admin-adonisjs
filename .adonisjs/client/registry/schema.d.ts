/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'clients.list': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/clients/list_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/clients/list_controller').default['handle']>>>
    }
  }
  'clients.store': {
    methods: ["POST"]
    pattern: '/api/v1/clients'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/clients').createClientValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/clients').createClientValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/clients/store_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/clients/store_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clients.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/clients/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/clients').updateClientValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/clients').updateClientValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/clients/update_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/clients/update_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clients.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/clients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/clients/destroy_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/clients/destroy_controller').default['handle']>>>
    }
  }
  'invoices.list': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/invoices'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invoices/list_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invoices/list_controller').default['handle']>>>
    }
  }
  'invoices.store': {
    methods: ["POST"]
    pattern: '/api/v1/invoices'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/invoice').createInvoiceValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/invoice').createInvoiceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invoices/store_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invoices/store_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'invoices.template_preview': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/invoices/template-preview'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invoices/template_preview_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invoices/template_preview_controller').default['handle']>>>
    }
  }
  'invoices.generate_pdf': {
    methods: ["POST"]
    pattern: '/api/v1/invoices/:id/generate-pdf'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invoices/generate_pdf_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invoices/generate_pdf_controller').default['handle']>>>
    }
  }
}
