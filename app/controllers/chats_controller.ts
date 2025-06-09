import Chat from '#models/chat'
import Message from '#models/message'
import { AiService } from '#services/ai_service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export class MessageDto {
  static toJson(message: Message) {
    return {
      id: message.id,
      text: message.text,
      createdAt: message.createdAt.toString(),
      type: message.type,
    }
  }
}

export class ChatDto {
  static toJson(chat: Chat) {
    return {
      id: chat.id,
      title: chat.title,
      createdAt: chat.createdAt.toFormat('yyyy LLL dd'),
      updatedAt: chat.updatedAt.toFormat('yyyy LLL dd'),
      messages: chat.messages
        .toSorted((a, b) => a.createdAt.diff(b.createdAt).milliseconds)
        .map(MessageDto.toJson),
    }
  }
}

export default class ChatsController {
  public async create({ inertia }: HttpContext) {
    return inertia.render('chat')
  }

  public async show({ inertia, request, auth }: HttpContext) {
    const { id } = request.params()

    const chat = await Chat.findByOrFail({ id, userId: auth.user!.id })

    await chat.load('messages')
    return inertia.render('chat', { chat: ChatDto.toJson(chat) })
  }

  @inject()
  public async store({ request, response, session, auth }: HttpContext, aiService: AiService) {
    const { userInput } = request.body()

    const newChat = await Chat.create({
      title: cuid(),
      userId: auth.user!.id,
    })

    await Message.create({
      text: userInput,
      type: 'user',
      chatId: newChat.id,
    })

    const embeddedMessage = (await aiService.createEmbedding(userInput)).join(',')
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

    const botResponse = await aiService.chat(`Context:${context}\nUser:${userInput}`)
    console.log('Bot Response:', botResponse)

    const botMessage = await Message.create({
      text: botResponse,
      type: 'ai',
      chatId: newChat.id,
    })

    session.flash('botResponseId', botMessage.id)

    return response.redirect().toRoute('chatShow', { id: newChat.id })
  }

  @inject()
  public async update({ request, response, session, auth }: HttpContext, aiService: AiService) {
    const { userInput } = request.body()
    const { id } = request.params()

    const chat = await Chat.findByOrFail({ id, userId: auth.user!.id })

    await Message.create({
      text: userInput,
      type: 'user',
      chatId: chat.id,
    })

    const embeddedMessage = (await aiService.createEmbedding(userInput)).join(',')
    const { rows: similarChunks } = await db.rawQuery(
      `
    SELECT content, embedding
    FROM documents
    WHERE (embedding <-> ?) < 1.2 AND user_id = ?
    ORDER BY (embedding <-> ?)
    LIMIT 5
  `,
      [`[${embeddedMessage}]`, auth.user!.id, `[${embeddedMessage}]`]
    )

    const context = similarChunks.map((row: any) => row.content).join('\n')
    console.log('Context:', context)

    const botResponse = await aiService.chat(`Context:${context}\nUser:${userInput}`)
    console.log('Bot Response:', botResponse)

    const newBotMessage = await Message.create({
      text: botResponse,
      type: 'ai',
      chatId: chat.id,
    })

    session.flash('botResponseId', newBotMessage.id)

    return response.redirect().toRoute('chatShow', { id: chat.id })
  }
}
