import router from '@adonisjs/core/services/router'

const ListController = () => import('#controllers/invoices/list_controller')
const StoreController = () => import('#controllers/invoices/store_controller')
const GeneratePdfController = () => import('#controllers/invoices/generate_pdf_controller')
const TemplatePreviewController = () => import('#controllers/invoices/template_preview_controller')

router
  .group(() => {
    router.get('invoices', [ListController])
    router.post('invoices', [StoreController])
    router.get('invoices/template-preview', [TemplatePreviewController])
    router.post('invoices/:id/generate-pdf', [GeneratePdfController])
  })
  .prefix('/api/v1')
  .as('invoices')
