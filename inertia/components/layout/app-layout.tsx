import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Upload, MessageSquare, Folder, MoreHorizontal, ChevronRight } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Chat } from '../chat'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <ScrollArea className="overflow-auto h-screen">
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
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            {children}
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel className="h-screen">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <h2 className="font-medium text-gray-900">Ask AI</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Ask questions about your documents</p>
          </div>

          <Chat />
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  )
}
