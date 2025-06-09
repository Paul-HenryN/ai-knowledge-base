import { ChatDto } from '#controllers/chats_controller'
import { DocumentDto } from '#controllers/documents_controller'
import { UserDto } from '#controllers/sessions_controller'
import Chat from '#models/chat'
import Document from '#models/document'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    recentDocuments: async ({ auth }) => {
      if (!auth.user) return []

      const documents = await Document.query()
        .where({ userId: auth.user.id })
        .orderBy('createdAt', 'desc')
        .limit(5)
      return documents.map(DocumentDto.toJson)
    },
    chats: async ({ auth }) => {
      if (!auth.user) return []

      const chats = await Chat.query()
        .preload('messages')
        .where({ userId: auth.user.id })
        .orderBy('createdAt', 'desc')
      return chats.map(ChatDto.toJson)
    },
    flash: ({ session }) => session.flashMessages,
    user: ({ auth }) => (auth.user ? UserDto.toJson(auth.user) : null),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
