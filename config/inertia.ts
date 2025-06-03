import { ChatDto } from '#controllers/chats_controller'
import { DocumentDto } from '#controllers/documents_controller'
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
    recentDocuments: async () => {
      const documents = await Document.query().orderBy('createdAt', 'desc').limit(5)
      return documents.map(DocumentDto.toJson)
    },
    chats: async () => {
      const chats = await Chat.query().preload('messages').orderBy('createdAt', 'desc')
      return chats.map(ChatDto.toJson)
    },
    flash: ({ session }) => session.flashMessages,
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
