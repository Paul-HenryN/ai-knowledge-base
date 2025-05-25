import Document from '#models/document'
import type { HttpContext } from '@adonisjs/core/http'
import OpenAI from 'openai'

export default class EmbeddingsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('embeddings/create')
  }

  async store({ request, inertia }: HttpContext) {
    const { text } = request.body()

    if (!text) {
      return inertia.render('embeddings/create', {
        error: 'Text is required to create an embedding.',
      })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    try {
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
      })

      const document = await Document.create({
        content: text,
        embedding: embedding.data[0].embedding, // Assuming the response structure
      })

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
