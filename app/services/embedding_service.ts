import { MultipartFile } from '@adonisjs/core/bodyparser'
import { AiService } from './ai_service.js'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js'
import Document from '#models/document'

export class EmbeddingService {
  private aiService: AiService

  constructor() {
    this.aiService = new AiService()
  }

  async embed(file: MultipartFile, document: Document) {
    const doc = await getDocument('storage/' + file.filePath!).promise

    const strings = []

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const textContent = await page.getTextContent()
      const pageStrings = textContent.items.map((item) => (item as TextItem).str)
      strings.push(...pageStrings)
    }
    const text = strings.join(' ')

    try {
      document.embedding = await this.aiService.createEmbedding(text)
      document.content = text
      document.status = 'success'
    } catch {
      document.status = 'failed'
    }

    await document.save()
  }
}
