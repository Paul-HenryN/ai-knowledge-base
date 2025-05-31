import DocumentsController from '#controllers/documents_controller'
import AppLayout from '@/components/layout/app-layout'
import { PDFViewer } from '@/components/pdf-viewer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InferPageProps } from '@adonisjs/inertia/types'
import { ChevronLeftIcon, ChevronRightIcon, FileText } from 'lucide-react'
import { useState } from 'react'

function pluralize(count: number, singular: string, plural: string) {
  if (count > 1) {
    return plural
  }

  return singular
}

const DocumentPage = ({ document }: InferPageProps<DocumentsController, 'show'>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  return (
    <main className="p-6">
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-6 w-6 text-red-500" />
            <h1 className="text-2xl font-semibold">{document.name}</h1>
            <Badge variant="secondary" className="uppercase">
              {document.type}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>2.4 MB</span>
            <span>•</span>
            <span>{document.updatedAt}</span>
            <span>•</span>
            <span>
              {totalPages} {pluralize(totalPages, 'page', 'pages')}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
              }
            }}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </Button>

          <Button
            size="icon"
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1)
              }
            }}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <PDFViewer
        pageNumber={currentPage}
        pdfUrl={document.url}
        onLoadSuccess={({ numPages }) => {
          setTotalPages(numPages)
        }}
      />
    </main>
  )
}

DocumentPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default DocumentPage
