import Document from '#models/document'
import { EmbeddingService } from '#services/embedding_service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export class DocumentDto {
  static toJson(document: Document) {
    return {
      id: document.id,
      name: document.name,
      createdAt: document.createdAt.toFormat('LLLL dd yyyy, HH:mm'),
      updatedAt: document.updatedAt.toFormat('LLLL dd yyyy, HH:mm'),
      type: document.type,
      url: document.url,
      status: document.status,
      lastViewedAt: document.lastViewedAt.toRelative(),
    }
  }
}

export default class DocumentsController {
  async show({ inertia, request, auth }: HttpContext) {
    const { id } = request.params()

    const user = auth.user!
    const document = await Document.findByOrFail({ id, userId: user.id })

    document.lastViewedAt = DateTime.now()
    await document.save()

    return inertia.render('document/show', { document: DocumentDto.toJson(document) })
  }

  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    return inertia.render('document/index', {
      documents: (await Document.findManyBy({ userId: user.id })).map(DocumentDto.toJson),
    })
  }

  @inject()
  async store(
    { request, inertia, response, auth }: HttpContext,
    embeddingService: EmbeddingService
  ) {
    const files = request.files('files', {
      extnames: ['pdf'],
      size: '10mb',
    })

    if (!files || !files.every((file) => file.isValid)) {
      return inertia.render('/', {
        error: 'One or many files sent in the request are invalid',
      })
    }

    files.forEach(async (file) => {
      const key = `documents/${cuid()}.${file.extname}`
      await file.moveToDisk(key)

      const newDocument = await Document.create({
        name: file.clientName,
        url: file.meta.url,
        type: file.extname,
        userId: auth.user!.id,
      })

      embeddingService.embed(file, newDocument)
    })

    return response.redirect().toRoute('documentsIndex')
  }

  async destroy({ request, response, auth }: HttpContext) {
    const { id } = request.params()
    const user = auth.user!

    const document = await Document.findByOrFail({ id, userId: user.id })
    await document.delete()

    return response.redirect().back()
  }
}
