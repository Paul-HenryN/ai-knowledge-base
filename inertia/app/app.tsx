/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import AppLayout from '@/components/layout/app-layout'
import { SharedProps } from '@adonisjs/inertia/types'
import { ComponentType, ReactNode } from 'react'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

interface PageModule<T> {
  default: ComponentType & {
    layout?: (page: ReactNode & { props: T }) => ReactNode
  }
}

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    const page = pages[`../pages/${name}.tsx`] as PageModule<SharedProps>

    if (!page.default.layout) {
      page.default.layout = (page) => <AppLayout>{page}</AppLayout>
    }

    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
