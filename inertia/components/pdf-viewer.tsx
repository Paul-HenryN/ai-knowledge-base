import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { OnDocumentLoadSuccess } from 'react-pdf/dist/esm/shared/types.js'

// Set worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type PDFViewerProps = {
  pdfUrl: string
  pageNumber?: number
  onLoadSuccess?: OnDocumentLoadSuccess
}

export function PDFViewer({ pdfUrl, pageNumber = 1, onLoadSuccess }: PDFViewerProps) {
  return (
    <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
      <Page pageNumber={pageNumber} scale={1.6} />
    </Document>
  )
}
