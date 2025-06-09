import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export class UserDto {
  static toJson(user: User) {
    return {
      id: user.id,
      fullName: user.fullName,
      provider: user.provider,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatarUrl: user.avatarUrl,
    }
  }
}

export default class SessionsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('login')
  }
}
