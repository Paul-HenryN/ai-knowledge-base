import AppLayout from '@/components/layout/app-layout'
import React from 'react'
import {
  BookOpenTextIcon,
  CheckCircle2Icon,
  FileTextIcon,
  LoaderCircleIcon,
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
import { router } from '@inertiajs/react'

function HomePage({ documents }: InferPageProps<DocumentsController, 'index'>) {
  const { setOpen } = useDocumentUploadDialog()

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
    <main className="p-5">
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow
              key={document.id}
              className={cn('cursor-pointer', document.status === 'pending' && 'animate-pulse')}
              onClick={() => router.visit(`/documents/${document.id}`)}
            >
              <TableCell className={'flex items-center gap-4'}>
                <FileTextIcon size={20} className="text-red-500" /> <span>{document.name}</span>
              </TableCell>

              <TableCell>{getStatusIcon(document.status)}</TableCell>

              <TableCell>{document.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

HomePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default HomePage
