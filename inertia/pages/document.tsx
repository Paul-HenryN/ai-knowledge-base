import Document from '#models/document'
import AppLayout from '@/components/layout/app-layout'
import { PDFViewer } from '@/components/pdf-viewer'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'

const DocumentPage = ({ document }: { document: Document }) => {
  return (
    <main className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-semibold text-gray-900">{document.name}</h1>
          <Badge variant="secondary" className="uppercase">
            {document.type}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>2.4 MB</span>
          <span>•</span>
          <span>{document.updatedAt.toString()}</span>
          <span>•</span>
          <span>12 pages</span>
        </div>
      </div>

      <PDFViewer pdfUrl={document.url} />
    </main>
  )
}

DocumentPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default DocumentPage
