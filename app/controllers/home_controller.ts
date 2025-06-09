import type { HttpContext } from '@adonisjs/core/http'
import Document from '#models/document'
import { DocumentDto } from '#controllers/documents_controller'

export default class HomeController {
  public async handle({ inertia, response, auth }: HttpContext) {
    const recentlyViewedDocuments = await Document.query()
      .where({ userId: auth.user!.id })
      .orderBy('lastViewedAt', 'desc')
      .limit(5)

    if (recentlyViewedDocuments.length === 0) {
      response.redirect().toRoute('onboarding')
    }

    return inertia.render('home', {
      recentlyViewedDocuments: recentlyViewedDocuments.map(DocumentDto.toJson),
    })
  }
}
