import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Star, MoreHorizontal, File, ImageIcon, FileSpreadsheet } from 'lucide-react'
import AppLayout from '@/components/layout/app-layout'
import React from 'react'
import { DocumentUpload } from '@/components/document-upload'
import Document from '#models/document'
import { Link } from '@inertiajs/react'

function HomePage({ documents }: { documents: Document[] }) {
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
    <div className="p-5">
      <DocumentUpload />

      {/* Recent Documents */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Documents</h2>
        <div className="flex flex-col gap-3">
          {documents.map((doc) => (
            <Link href={`/documents/${doc.id}`} key={doc.id}>
              <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <p className="text-sm text-gray-500">
                          {5} • {doc.updatedAt.toString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {true && <Star className="h-4 w-4 text-yellow-500" />}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

HomePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default HomePage
