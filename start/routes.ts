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
const HomeController = () => import('#controllers/home_controller')
const OnboardingController = () => import('#controllers/onboarding_controller')
const RegisteredUsersController = () => import('#controllers/registered_users_controller')
const OAuthController = () => import('#controllers/oauth_controller')

import router from '@adonisjs/core/services/router'

router.get('/', [HomeController]).as('home')
router.get('/onboarding', [OnboardingController]).as('onboarding')

router.get('/documents', [DocumentsController, 'index']).as('documentsIndex')
router.post('/documents', [DocumentsController, 'store'])
router.get('/documents/:id', [DocumentsController, 'show'])
router.delete('/documents/:id', [DocumentsController, 'destroy'])

router.get('/chat/:id', [ChatsController, 'show']).as('chatShow')
router.post('/chat', [ChatsController, 'store'])
router.put('/chat/:id', [ChatsController, 'update'])

router.get('/signup', [RegisteredUsersController, 'create'])

// OAuth
router.get('/:provider/redirect', [OAuthController, 'create'])
router.get('/:provider/callback', [OAuthController, 'store'])
