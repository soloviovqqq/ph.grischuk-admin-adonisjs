import vine from '@vinejs/vine'

const dateString = () => vine.string().regex(/^\d{4}-\d{2}-\d{2}$/)
const nullableText = () => vine.string().trim().nullable().optional()
const requiredText = () => vine.string().trim().minLength(1)
const cents = () => vine.number().withoutDecimals().nonNegative()
const nullableCents = () => cents().nullable().optional()

const invoiceItem = vine.object({
  description: requiredText(),
  quantity: vine.number().withoutDecimals().positive().nullable().optional(),
  unitPrice: nullableCents(),
  totalPrice: cents(),
})

export const createClientValidator = vine.create({
  name: requiredText(),
  addressLine1: requiredText(),
  addressLine2: nullableText(),
  zip: requiredText(),
  city: requiredText(),
  country: requiredText(),
  email: vine.string().email().maxLength(254).nullable().optional(),
})

export const updateClientValidator = vine.create({
  name: requiredText().optional(),
  addressLine1: requiredText().optional(),
  addressLine2: nullableText(),
  zip: requiredText().optional(),
  city: requiredText().optional(),
  country: requiredText().optional(),
  email: vine.string().email().maxLength(254).nullable().optional(),
})

export const invoiceSettingsValidator = vine.create({
  businessName: requiredText().optional(),
  addressLine1: requiredText().optional(),
  addressLine2: nullableText(),
  zip: requiredText().optional(),
  city: requiredText().optional(),
  country: requiredText().optional(),
  phone: nullableText(),
  email: vine.string().email().maxLength(254).optional(),
  taxNumber: nullableText(),
  gisaNumber: nullableText(),
  iban: requiredText().optional(),
  bic: requiredText().optional(),
  bankAccountName: requiredText().optional(),
  bankName: requiredText().optional(),
  smallBusinessText: requiredText().optional(),
  defaultPaymentDueDays: vine.number().withoutDecimals().min(1).max(365).optional(),
})

export const createInvoiceValidator = vine.create({
  clientId: vine.number().withoutDecimals().positive(),
  issueDate: dateString(),
  serviceDate: dateString().nullable().optional(),
  paymentMethod: requiredText().optional(),
  paymentDueDays: vine.number().withoutDecimals().min(1).max(365).optional(),
  items: vine.array(invoiceItem).minLength(1),
})

export const updateInvoiceValidator = vine.create({
  clientId: vine.number().withoutDecimals().positive().optional(),
  issueDate: dateString().optional(),
  serviceDate: dateString().nullable().optional(),
  paymentMethod: requiredText().optional(),
  paymentDueDays: vine.number().withoutDecimals().min(1).max(365).optional(),
  items: vine.array(invoiceItem).minLength(1).optional(),
})

export type InvoiceItemPayload = {
  description: string
  quantity?: number | null
  unitPrice?: number | null
  totalPrice: number
}
