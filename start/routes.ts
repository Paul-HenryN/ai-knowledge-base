/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const EmbeddingsController = () => import('#controllers/embeddings_controller')
const ChatsController = () => import('#controllers/chats_controller')

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
router.get('/embeddings/create', [EmbeddingsController, 'create'])
router.post('/embeddings/create', [EmbeddingsController, 'store'])
router.on('/chat').renderInertia('chat')
router.post('/chat', [ChatsController, 'post'])
