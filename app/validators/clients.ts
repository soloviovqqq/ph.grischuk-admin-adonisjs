import vine from '@vinejs/vine'

export const createClientValidator = vine.create({
  name: vine.string().trim().minLength(1),
  address: vine.string().trim().minLength(1),
  zip: vine.string().trim().minLength(1),
  city: vine.string().trim().minLength(1),
  country: vine.string().trim().minLength(1),
  phone: vine.string().maxLength(255).nullable().optional(),
  email: vine.string().email().maxLength(255).nullable().optional(),
})

export const updateClientValidator = vine.create({
  name: vine.string().trim().minLength(1).optional(),
  address: vine.string().trim().minLength(1).optional(),
  zip: vine.string().trim().minLength(1).optional(),
  city: vine.string().trim().minLength(1).optional(),
  country: vine.string().trim().minLength(1).optional(),
  phone: vine.string().maxLength(255).nullable().optional(),
  email: vine.string().email().maxLength(255).nullable().optional(),
})
