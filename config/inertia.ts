import { DocumentDto } from '#controllers/documents_controller'
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
