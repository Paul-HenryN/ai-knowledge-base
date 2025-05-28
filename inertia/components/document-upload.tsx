import { Upload } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

export function DocumentUpload() {
  const { data, setData, processing, post, reset } = useForm<{ file: File | null }>({
    file: null,
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      setData('file', selectedFile)
    }
  }

  useEffect(() => {
    if (data.file) {
      post('/documents')
      reset()
    }
  }, [data])

  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors relative">
      <CardContent className="p-8">
        <div className="text-center">
          {data.file ? (
            <div className="flex flex-col items-center gap-2">
              {processing ? 'Uploading...' : null}
              <p>{data.file.name}</p>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your documents</h3>
              <p className="text-gray-500 mb-4">Drag and drop files here, or click to browse</p>
              <Button>Choose Files</Button>
              <p className="text-xs text-gray-400 mt-2">
                Supports PDF, DOC, DOCX, XLS, XLSX up to 100MB
              </p>
            </>
          )}

          <input
            type="file"
            className="bg-red-300 absolute inset-0 opacity-0"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}
