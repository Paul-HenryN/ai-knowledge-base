import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  FileText,
  Upload,
  MessageSquare,
  Folder,
  Star,
  Send,
  Paperclip,
  MoreHorizontal,
  ChevronRight,
  File,
  ImageIcon,
  FileSpreadsheet,
} from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function HomePage() {
  const [chatMessage, setChatMessage] = useState('')

  const documents = [
    {
      id: 'getting-started',
      name: 'Getting Started Guide',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2 hours ago',
      starred: true,
    },
    {
      id: 'api-docs',
      name: 'API Documentation',
      type: 'pdf',
      size: '1.8 MB',
      modified: '1 day ago',
      starred: false,
    },
    {
      id: 'user-manual',
      name: 'User Manual v2.1',
      type: 'pdf',
      size: '5.2 MB',
      modified: '3 days ago',
      starred: true,
    },
    {
      id: 'meeting-notes',
      name: 'Q4 Meeting Notes',
      type: 'doc',
      size: '890 KB',
      modified: '1 week ago',
      starred: false,
    },
    {
      id: 'product-specs',
      name: 'Product Specifications',
      type: 'xlsx',
      size: '1.2 MB',
      modified: '2 weeks ago',
      starred: false,
    },
  ]

  const chatHistory = [
    {
      id: 1,
      type: 'user',
      message: 'What are the main features mentioned in the getting started guide?',
    },
    {
      id: 2,
      type: 'ai',
      message:
        'Based on the Getting Started Guide, the main features include:\n\n1. **Document Upload & Processing** - Support for PDF, Word, and Excel files\n2. **Natural Language Queries** - Ask questions in plain English\n3. **Smart Search** - AI-powered semantic search across all documents\n4. **Collaborative Workspaces** - Share knowledge bases with team members\n5. **Integration APIs** - Connect with existing tools and workflows\n\nWould you like me to elaborate on any of these features?',
    },
    { id: 3, type: 'user', message: 'How do I upload multiple documents at once?' },
    {
      id: 4,
      type: 'ai',
      message:
        'You can upload multiple documents simultaneously by:\n\n1. **Drag & Drop** - Select multiple files and drag them to the upload area\n2. **Bulk Upload** - Click the "Upload" button and use Ctrl/Cmd+click to select multiple files\n3. **Folder Upload** - Some browsers support dragging entire folders\n\nThe system supports up to 50 files per upload, with a maximum size of 100MB per file.',
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />
      case 'doc':
        return <File className="h-4 w-4 text-blue-500" />
      case 'xlsx':
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case 'image':
        return <ImageIcon className="h-4 w-4 text-purple-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" />
    }
  }

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

            {/* Document Content */}
            <div className="p-5">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-6 w-6 text-red-500" />
                  <h1 className="text-2xl font-semibold text-gray-900">Getting Started Guide</h1>
                  <Badge variant="secondary">PDF</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>2.4 MB</span>
                  <span>•</span>
                  <span>Modified 2 hours ago</span>
                  <span>•</span>
                  <span>12 pages</span>
                </div>
              </div>

              {/* Upload Area */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Upload your documents
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Drag and drop files here, or click to browse
                    </p>
                    <Button>Choose Files</Button>
                    <p className="text-xs text-gray-400 mt-2">
                      Supports PDF, DOC, DOCX, XLS, XLSX up to 100MB
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Documents */}
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Documents</h2>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getFileIcon(doc.type)}
                            <div>
                              <h3 className="font-medium text-gray-900">{doc.name}</h3>
                              <p className="text-sm text-gray-500">
                                {doc.size} • {doc.modified}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.starred && <Star className="h-4 w-4 text-yellow-500" />}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
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

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-2 h-[80%]">
            <div className="space-y-4">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
                >
                  {message.type === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.message}</p>
                    </div>
                  </div>
                  {message.type === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-200">U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask a question about your documents..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="pr-10"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                >
                  <Paperclip className="h-3 w-3" />
                </Button>
              </div>
              <Button size="sm" className="px-3">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  )
}
