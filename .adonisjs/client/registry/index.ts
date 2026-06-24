/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'clients.store': {
    methods: ["POST"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.store']['types'],
  },
  'clients.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.index']['types'],
  },
  'clients.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['clients.show']['types'],
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
  'invoice_settings.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/invoice-settings',
    tokens: [{"old":"/api/v1/invoice-settings","type":0,"val":"api","end":""},{"old":"/api/v1/invoice-settings","type":0,"val":"v1","end":""},{"old":"/api/v1/invoice-settings","type":0,"val":"invoice-settings","end":""}],
    types: placeholder as Registry['invoice_settings.show']['types'],
  },
  'invoice_settings.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/invoice-settings',
    tokens: [{"old":"/api/v1/invoice-settings","type":0,"val":"api","end":""},{"old":"/api/v1/invoice-settings","type":0,"val":"v1","end":""},{"old":"/api/v1/invoice-settings","type":0,"val":"invoice-settings","end":""}],
    types: placeholder as Registry['invoice_settings.update']['types'],
  },
  'invoices.store': {
    methods: ["POST"],
    pattern: '/api/v1/invoices',
    tokens: [{"old":"/api/v1/invoices","type":0,"val":"api","end":""},{"old":"/api/v1/invoices","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices","type":0,"val":"invoices","end":""}],
    types: placeholder as Registry['invoices.store']['types'],
  },
  'invoices.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/invoices',
    tokens: [{"old":"/api/v1/invoices","type":0,"val":"api","end":""},{"old":"/api/v1/invoices","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices","type":0,"val":"invoices","end":""}],
    types: placeholder as Registry['invoices.index']['types'],
  },
  'invoices.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/invoices/:id',
    tokens: [{"old":"/api/v1/invoices/:id","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['invoices.show']['types'],
  },
  'invoices.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/invoices/:id',
    tokens: [{"old":"/api/v1/invoices/:id","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['invoices.update']['types'],
  },
  'invoices.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/invoices/:id',
    tokens: [{"old":"/api/v1/invoices/:id","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['invoices.destroy']['types'],
  },
  'invoices.issue': {
    methods: ["POST"],
    pattern: '/api/v1/invoices/:id/issue',
    tokens: [{"old":"/api/v1/invoices/:id/issue","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id/issue","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id/issue","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id/issue","type":1,"val":"id","end":""},{"old":"/api/v1/invoices/:id/issue","type":0,"val":"issue","end":""}],
    types: placeholder as Registry['invoices.issue']['types'],
  },
  'invoices.generate_pdf': {
    methods: ["POST"],
    pattern: '/api/v1/invoices/:id/generate-pdf',
    tokens: [{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":1,"val":"id","end":""},{"old":"/api/v1/invoices/:id/generate-pdf","type":0,"val":"generate-pdf","end":""}],
    types: placeholder as Registry['invoices.generate_pdf']['types'],
  },
  'invoices.download': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/invoices/:id/download',
    tokens: [{"old":"/api/v1/invoices/:id/download","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id/download","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id/download","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id/download","type":1,"val":"id","end":""},{"old":"/api/v1/invoices/:id/download","type":0,"val":"download","end":""}],
    types: placeholder as Registry['invoices.download']['types'],
  },
  'invoices.mark_paid': {
    methods: ["POST"],
    pattern: '/api/v1/invoices/:id/mark-paid',
    tokens: [{"old":"/api/v1/invoices/:id/mark-paid","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id/mark-paid","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id/mark-paid","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id/mark-paid","type":1,"val":"id","end":""},{"old":"/api/v1/invoices/:id/mark-paid","type":0,"val":"mark-paid","end":""}],
    types: placeholder as Registry['invoices.mark_paid']['types'],
  },
  'invoices.cancel': {
    methods: ["POST"],
    pattern: '/api/v1/invoices/:id/cancel',
    tokens: [{"old":"/api/v1/invoices/:id/cancel","type":0,"val":"api","end":""},{"old":"/api/v1/invoices/:id/cancel","type":0,"val":"v1","end":""},{"old":"/api/v1/invoices/:id/cancel","type":0,"val":"invoices","end":""},{"old":"/api/v1/invoices/:id/cancel","type":1,"val":"id","end":""},{"old":"/api/v1/invoices/:id/cancel","type":0,"val":"cancel","end":""}],
    types: placeholder as Registry['invoices.cancel']['types'],
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
