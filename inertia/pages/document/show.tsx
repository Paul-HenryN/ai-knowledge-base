import DocumentsController from '#controllers/documents_controller'
import AppLayout from '@/components/layout/app-layout'
import { Badge } from '@/components/ui/badge'
import { InferPageProps, PageObject } from '@adonisjs/inertia/types'
import { BookOpenTextIcon, FileText } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import { Skeleton } from '@/components/ui/skeleton'

type DocumentPageProps = InferPageProps<DocumentsController, 'show'>

const DocumentPage = ({ document }: DocumentPageProps) => {
  const { data: fileBlobUrl, isLoading } = useQuery({
    queryKey: ['documents', document.id, 'file'],
    queryFn: () =>
      axios.get(document.url, { responseType: 'arraybuffer' }).then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' })
        return URL.createObjectURL(blob)
      }),
    staleTime: Infinity,
  })

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-semibold truncate max-w-[600px]" title={document.name}>
            {document.name}
          </h1>
          <Badge variant="secondary" className="uppercase">
            {document.type}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>2.4 MB</span>
          <span>•</span>
          <span>{document.createdAt}</span>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="w-full h-[800px]" />
      ) : (
        <embed src={fileBlobUrl} width="100%" height="800" />
      )}
    </>
  )
}

DocumentPage.layout = (page: PageObject<DocumentPageProps>) => {
  const document = page.props.document

  const breadcrumbData = [
    {
      label: 'Knowledge base',
      href: '/',
      icon: BookOpenTextIcon,
    },
    {
      label: document.name,
      href: `/documents/${document.id}`,
    },
  ]

  return <AppLayout breadcrumbData={breadcrumbData}>{page}</AppLayout>
}

export default DocumentPage
