import router from '@adonisjs/core/services/router'

const ListController = () => import('#controllers/invoices/list_controller')
const StoreController = () => import('#controllers/invoices/store_controller')
const GeneratePdfController = () => import('#controllers/invoices/generate_pdf_controller')
// const DestroyController = () => import('#controllers/invoices/destroy_controller')
// const UpdateController = () => import('#controllers/invoices/update_controller')

router
  .group(() => {
    router.get('invoices', [ListController])
    router.post('invoices', [StoreController])
    // router.patch('invoices/:id', [UpdateController])
    // router.delete('invoices/:id', [DestroyController])
    router.post('invoices/:id/generate-pdf', [GeneratePdfController])
  })
  .prefix('/api/v1')
  .as('invoices')
