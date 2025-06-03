import type { HttpContext } from '@adonisjs/core/http'

export default class OnboardingController {
  public async handle({ inertia }: HttpContext) {
    return inertia.render('onboarding')
  }
}
