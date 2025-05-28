import Document from '#models/document'
import { EmbeddingService } from '#services/embedding_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { cuid } from '@adonisjs/core/helpers'
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js'

export default class DocumentsController {
  async show({ inertia, request }: HttpContext) {
    const { id } = request.params()
    const document = await Document.findOrFail(id)

    return inertia.render('document', { document })
  }

  async index({ inertia }: HttpContext) {
    const documents = await Document.query().orderBy('updatedAt', 'desc')

    return inertia.render('home', { documents })
  }

  @inject()
  async store({ request, inertia, response }: HttpContext, embeddingService: EmbeddingService) {
    const file = request.file('file', {
      extnames: ['pdf'],
      size: '10mb',
    })

    if (!file || !file.isValid) {
      return inertia.render('/', {
        error: 'A valid PDF file is required to create an embedding.',
      })
    }

    try {
      const key = `documents/${cuid()}.${file.extname}`
      await file.moveToDisk(key)
      const doc = await getDocument('storage/' + file.filePath!).promise

      const strings = []
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i)
        const textContent = await page.getTextContent()
        const pageStrings = textContent.items.map((item) => (item as TextItem).str)
        strings.push(...pageStrings)
      }

      const text = strings.join(' ')
      const embedding = await embeddingService.createEmbedding(text)
      await Document.create({
        content: text,
        embedding,
        name: file.clientName || 'Untitled',
        url: file.meta.url,
        type: file.extname,
      })

      const documents = await Document.query().orderBy('updatedAt', 'desc')

      return response.redirect().toRoute('home', { documents })
    } catch (error) {
      console.error('Error creating embedding:', error)

      return inertia.render('/', {
        error: 'Failed to create embedding. Please try again later.',
      })
    }
  }
}
