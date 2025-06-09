import User from '#models/user'
import { oauthProviderValidator } from '#validators/oauth_provider_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class OAuthController {
  public async create({ ally, request }: HttpContext) {
    const { provider } = request.params()
    const validatedProvider = await oauthProviderValidator.validate(provider)

    return ally.use(validatedProvider).redirect()
  }

  public async store({ ally, request, response, auth }: HttpContext) {
    const { provider } = request.params()
    const validatedProvider = await oauthProviderValidator.validate(provider)

    const driver = ally.use(validatedProvider)

    if (driver.accessDenied()) {
      return 'You have cancelled the login process'
    }

    if (driver.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    if (driver.hasError()) {
      return driver.getError()
    }

    const user = await driver.user()

    const newUser = await User.updateOrCreate(
      {
        email: user.email,
      },
      {
        email: user.email,
        fullName: user.name,
        provider: validatedProvider,
        avatarUrl: user.avatarUrl,
      }
    )

    await auth.use('web').login(newUser)

    return response.redirect().toRoute('home')
  }
}
