import { Button } from '@/components/ui/button'
import { Folder, MoreHorizontal, ChevronRight } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { DocumentUploadDialog, DocumentUploadDialogProvider } from '../document-upload-dialog'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { props } = usePage<SharedProps>()

  return (
    <DocumentUploadDialogProvider>
      <SidebarProvider>
        <AppSidebar recentDocuments={props.recentDocuments} />

        <div className="w-full">
          <header className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger />

                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Knowledge Base</span>
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                  <span className="text-sm font-medium">Getting Started Guide</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6">{children}</main>
        </div>
      </SidebarProvider>

      <DocumentUploadDialog />
    </DocumentUploadDialogProvider>
  )
}
