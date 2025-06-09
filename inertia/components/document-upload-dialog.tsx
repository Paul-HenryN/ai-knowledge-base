'use client'

import type React from 'react'

import {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { useForm } from '@inertiajs/react'

type DocumentUploadDialogContextType = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DocumentUploadDialogContext = createContext<DocumentUploadDialogContextType>({
  isOpen: false,
  setOpen: () => {},
})

interface UploadedFile {
  file: File
  id: string
  status: 'uploading' | 'success' | 'error'
  progress: number
  error?: string
}

export function DocumentUploadDialog() {
  const { isOpen, setOpen } = useDocumentUploadDialog()
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const { setData, post } = useForm<{ files: File[] | null }>({
    files: null,
  })

  const isValidFileType = (file: File) => {
    return file.type === 'application/pdf' || file.name.endsWith('.pdf')
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, status: 'success', progress: 100 } : f))
        )
      } else {
        setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
      }
    }, 200)
  }

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(isValidFileType)
    const invalidFiles = fileArray.filter((file) => !isValidFileType(file))

    if (invalidFiles.length > 0) {
      // Handle invalid files
      console.warn(
        'Invalid file types:',
        invalidFiles.map((f) => f.name)
      )
    }

    const newUploadedFiles: UploadedFile[] = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'uploading',
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles])

    // Simulate upload for each file
    newUploadedFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id)
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const files = e.dataTransfer.files
      handleFiles(files)
    },
    [handleFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleSubmit = () => {
    post('/documents', { onSuccess: () => setOpen(false) })
  }

  const allUploadsComplete =
    uploadedFiles.length > 0 && uploadedFiles.every((f) => f.status === 'success')

  useEffect(() => {
    setData(
      'files',
      uploadedFiles.map((uploadedFile) => uploadedFile.file)
    )
  }, [uploadedFiles])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mb-1">Upload Documents to Knowledge Base</DialogTitle>
          <DialogDescription>
            Upload PDF files to enhance your AI knowledge base. Drag and drop files or click to
            browse.
          </DialogDescription>
        </DialogHeader>

        <div className="my-3">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />

            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your documents here</p>
              <p className="text-sm text-muted-foreground">
                Supports PDF and Markdown files (max 10MB each)
              </p>
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse Files
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.md,.markdown"
                      onChange={handleFileInput}
                      className="sr-only"
                    />
                  </label>
                </Button>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div>
              <p className="my-5">Uploaded Files</p>

              <ScrollArea className="h-60">
                <div className="flex flex-col gap-3 py-3">
                  {uploadedFiles.map((uploadedFile) => (
                    <UploadedFile file={uploadedFile} onRemove={(id) => removeFile(id)} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {uploadedFiles.length > 0 && (
          <DialogFooter>
            <Button disabled={!allUploadsComplete} onClick={handleSubmit}>
              Complete
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

function UploadedFile({
  file,
  onRemove,
}: {
  file: UploadedFile
  onRemove: (fileId: UploadedFile['id']) => void
}) {
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) {
      return <File className="h-4 w-4 text-red-500" />
    }
    return <File className="h-4 w-4 text-blue-500" />
  }

  const getFileTypeLabel = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return 'PDF'
    if (fileName.endsWith('.md') || fileName.endsWith('.markdown')) return 'Markdown'
    return 'Unknown'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg">
      {getFileIcon(file.file.name)}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium truncate max-w-[300px]">{file.file.name}</p>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {getFileTypeLabel(file.file.name)}
            </Badge>
            {file.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
            {file.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(file.id)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{formatFileSize(file.file.size)}</p>
          {file.status === 'uploading' && (
            <span className="text-xs text-muted-foreground">{Math.round(file.progress)}%</span>
          )}
        </div>
        {file.status === 'uploading' && <Progress value={file.progress} className="h-1 mt-2" />}
        {file.status === 'error' && file.error && (
          <p className="text-xs text-red-500 mt-1">{file.error}</p>
        )}
      </div>
    </div>
  )
}

export const DocumentUploadDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <DocumentUploadDialogContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </DocumentUploadDialogContext.Provider>
  )
}

export function useDocumentUploadDialog() {
  return useContext(DocumentUploadDialogContext)
}
