/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import EmbeddingsController from '#controllers/embeddings_controller'
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
router.get('/embeddings/create', [EmbeddingsController, 'create'])
router.post('/embeddings/create', [EmbeddingsController, 'store'])
