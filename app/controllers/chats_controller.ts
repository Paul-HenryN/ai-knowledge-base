import { EmbeddingService } from '#services/embedding_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ChatsController {
  @inject()
  public async post({ request, inertia }: HttpContext, embeddingService: EmbeddingService) {
    const { message } = request.body()

    const embeddedMessage = (await embeddingService.createEmbedding(message)).join(',')

    const { rows: similarChunks } = await db.rawQuery(
      `
    SELECT content, embedding
    FROM documents
    WHERE (embedding <-> ?) < 1.2
    ORDER BY (embedding <-> ?)
    LIMIT 5
  `,
      [`[${embeddedMessage}]`, `[${embeddedMessage}]`]
    )

    const context = similarChunks.map((row: any) => row.content).join('\n')
    console.log('Context:', context)

    const botResponse = await embeddingService.chat(`Context:${context}\nUser:${message}`)
    console.log('Bot Response:', botResponse)

    return inertia.render('chat', { message })
  }
}
