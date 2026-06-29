/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'clients.list': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.list']['types'],
  },
  'clients.store': {
    methods: ["POST"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.store']['types'],
  },
  'clients.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['clients.update']['types'],
  },
  'clients.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['clients.destroy']['types'],
  },
  'invoices.list': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/invoices',
    tokens: [{"old":"/api/v1/invoices","type":0,"val":"api","end":""},{"old":"/api/v1/invoices","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices","type":0,"val":"invoices","end":""}],
    types: placeholder as Registry['invoices.list']['types'],
  },
  'invoices.store': {
    methods: ["POST"],
    pattern: '/api/v1/invoices',
    tokens: [{"old":"/api/v1/invoices","type":0,"val":"api","end":""},{"old":"/api/v1/invoices","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices","type":0,"val":"invoices","end":""}],
    types: placeholder as Registry['invoices.store']['types'],
  },
  'invoices.template_preview': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/invoices/template-preview',
    tokens: [{"old":"/api/v1/invoices/template-preview","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/template-preview","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/template-preview","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/template-preview","type":0,"val":"template-preview","end":""}],
    types: placeholder as Registry['invoices.template_preview']['types'],
  },
  'invoices.generate_pdf': {
    methods: ["POST"],
    pattern: '/api/v1/invoices/:id/generate-pdf',
    tokens: [{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":1,"val":"id","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"generate-pdf","end":""}],
    types: placeholder as Registry['invoices.generate_pdf']['types'],
  },
  'invoices.update_status': {
    methods: ["PATCH"],
    pattern: '/api/v1/invoices/:id/status',
    tokens: [{"old":"/api/v1/invoices/:id/status","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id/status","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id/status","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id/status","type":1,"val":"id","end":""},{"old":"/api/v1/invoices/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['invoices.update_status']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
