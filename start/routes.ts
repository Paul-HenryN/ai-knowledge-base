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
router.get('/', [DocumentsController, 'index']).as('home')
router.post('/documents', [DocumentsController, 'store'])
router.on('/chat').renderInertia('chat')
router.post('/chat', [ChatsController, 'post'])
router.get('/documents/:id', [DocumentsController, 'show'])
