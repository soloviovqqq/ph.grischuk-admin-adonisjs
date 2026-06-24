/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import '#start/routes/clients'

// const InvoiceSettingsController = () => import('#controllers/invoice_settings_controller')
// const InvoicesController = () => import('#controllers/invoices_controller')

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // router
    //   .group(() => {
    //     router.post('signup', [controllers.NewAccount, 'store'])
    //     router.post('login', [controllers.AccessTokens, 'store'])
    //   })
    //   .prefix('auth')
    //   .as('auth')
    //
    // router
    //   .group(() => {
    //     router.get('profile', [controllers.Profile, 'show'])
    //     router.post('logout', [controllers.AccessTokens, 'destroy'])
    //   })
    //   .prefix('account')
    //   .as('profile')
    //   .use(middleware.auth())
    //
    // router.get('invoice-settings', [InvoiceSettingsController, 'show'])
    // router.patch('invoice-settings', [InvoiceSettingsController, 'update'])
    //
    // router.post('invoices', [InvoicesController, 'store'])
    // router.get('invoices', [InvoicesController, 'index'])
    // router.get('invoices/:id', [InvoicesController, 'show'])
    // router.patch('invoices/:id', [InvoicesController, 'update'])
    // router.delete('invoices/:id', [InvoicesController, 'destroy'])
    // router.post('invoices/:id/issue', [InvoicesController, 'issue'])
    // router.post('invoices/:id/generate-pdf', [InvoicesController, 'generatePdf'])
    // router.get('invoices/:id/download', [InvoicesController, 'download'])
    // router.post('invoices/:id/mark-paid', [InvoicesController, 'markPaid'])
    // router.post('invoices/:id/cancel', [InvoicesController, 'cancel'])
  })
  .prefix('/api/v1')
