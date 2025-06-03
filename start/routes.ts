/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const DocumentsController = () => import('#controllers/documents_controller')
const ChatsController = () => import('#controllers/chats_controller')

import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')
router.get('/documents', [DocumentsController, 'index']).as('documentsIndex')
router.post('/documents', [DocumentsController, 'store'])
router.get('/documents/:id', [DocumentsController, 'show'])

router.get('/chat/:id', [ChatsController, 'show']).as('chatShow')
router.post('/chat', [ChatsController, 'store'])
router.put('/chat/:id', [ChatsController, 'update'])
