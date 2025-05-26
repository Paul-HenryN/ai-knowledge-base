import Document from '#models/document'
import { EmbeddingService } from '#services/embedding_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js'

export default class EmbeddingsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('embeddings/create')
  }

  @inject()
  async store({ request, inertia }: HttpContext, embeddingService: EmbeddingService) {
    const file = request.file('file', {
      extnames: ['pdf'],
      size: '10mb',
    })

    if (!file || !file.isValid) {
      return inertia.render('embeddings/create', {
        error: 'A valid PDF file is required to create an embedding.',
      })
    }

    try {
      await file.move('./tmp')
      const doc = await getDocument(file.filePath!).promise

      const strings = []

      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i)
        const textContent = await page.getTextContent()
        const pageStrings = textContent.items.map((item) => (item as TextItem).str)
        strings.push(...pageStrings)
      }

      const text = strings.join(' ')

      const embedding = await embeddingService.createEmbedding(text)

      const document = await Document.create({
        content: text,
        embedding, // Assuming the response structure
      })

      console.log(strings.join(' '))

      return inertia.render('embeddings/create', {
        document,
      })
    } catch (error) {
      console.error('Error creating embedding:', error)

      return inertia.render('embeddings/create', {
        error: 'Failed to create embedding. Please try again later.',
      })
    }
  }
}
