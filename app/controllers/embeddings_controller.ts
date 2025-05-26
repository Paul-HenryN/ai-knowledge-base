import Document from '#models/document'
import type { HttpContext } from '@adonisjs/core/http'
import OpenAI from 'openai'
import fs from 'fs/promises'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js'

export default class EmbeddingsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('embeddings/create')
  }

  async store({ request, inertia }: HttpContext) {
    const file = request.file('file', {
      extnames: ['pdf'],
      size: '10mb',
    })

    if (!file || !file.isValid) {
      return inertia.render('embeddings/create', {
        error: 'A valid PDF file is required to create an embedding.',
      })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

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

      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
      })

      const document = await Document.create({
        content: text,
        embedding: embedding.data[0].embedding, // Assuming the response structure
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
