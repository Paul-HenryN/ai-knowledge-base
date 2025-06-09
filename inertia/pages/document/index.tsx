import {
  BookOpenTextIcon,
  CheckCircle2Icon,
  FileTextIcon,
  LoaderCircleIcon,
  TrashIcon,
  Upload,
  XCircleIcon,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useDocumentUploadDialog } from '@/components/document-upload-dialog'
import { cn } from '@/lib/utils'
import { InferPageProps } from '@adonisjs/inertia/types'
import DocumentsController from '#controllers/documents_controller'
import { router, useForm } from '@inertiajs/react'

export default function DocumentsIndexPage({
  documents,
}: InferPageProps<DocumentsController, 'index'>) {
  const { setOpen } = useDocumentUploadDialog()
  const { delete: destroy, processing } = useForm()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'failed':
        return <XCircleIcon size={18} className="text-red-500" />
      case 'pending':
        return <LoaderCircleIcon size={18} className="text-gray-400 animate-spin" />
      default:
        return <CheckCircle2Icon size={18} className="text-green-500" />
    }
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <BookOpenTextIcon size={24} />
          <h1 className="text-2xl">Knowledge Base</h1>
        </div>

        <Button onClick={() => setOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Document</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Created At</TableHead>
            <TableHead className="w-[25px]">Last viewed</TableHead>
            <TableHead className="w-[25px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow
              key={document.id}
              className={cn('cursor-pointer', document.status === 'pending' && 'animate-pulse')}
              onClick={() => router.visit(`/documents/${document.id}`)}
            >
              <TableCell>
                <div className="flex gap-2 items-center">
                  <FileTextIcon className="text-red-500 size-5" /> <span>{document.name}</span>
                </div>
              </TableCell>

              <TableCell>{getStatusIcon(document.status)}</TableCell>

              <TableCell>{document.createdAt}</TableCell>

              <TableCell>{document.lastViewedAt}</TableCell>

              <TableCell>
                <Button
                  size="icon"
                  variant="outline"
                  className="p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    destroy(`/documents/${document.id}`)
                  }}
                  disabled={processing || document.status === 'pending'}
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
