import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export function PDFViewer({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        <Page pageNumber={pageNumber} width={0} />
      </Document>

      <div>
        <button onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}>Previous</button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}>Next</button>
      </div>
    </div>
  )
}
