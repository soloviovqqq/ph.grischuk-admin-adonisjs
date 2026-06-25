import router from '@adonisjs/core/services/router'

const ListController = () => import('#controllers/clients/list_controller')
const StoreController = () => import('#controllers/clients/store_controller')
const DestroyController = () => import('#controllers/clients/destroy_controller')
const UpdateController = () => import('#controllers/clients/update_controller')

router
  .group(() => {
    router.get('clients', [ListController])
    router.post('clients', [StoreController])
    router.patch('clients/:id', [UpdateController])
    router.delete('clients/:id', [DestroyController])
  })
  .prefix('/api/v1')
  .as('clients')
