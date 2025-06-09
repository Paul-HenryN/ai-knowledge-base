import type { HttpContext } from '@adonisjs/core/http'

export default class RegisteredUsersController {
  async create({ inertia }: HttpContext) {
    return inertia.render('signup')
  }
}
