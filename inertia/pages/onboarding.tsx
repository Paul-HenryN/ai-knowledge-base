import { useDocumentUploadDialog } from '@/components/document-upload-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Brain, Zap } from 'lucide-react'

export default function OnboardingPage() {
  const { setOpen } = useDocumentUploadDialog()

  return (
    <div className="max-w-3xl w-full space-y-8 mx-auto mt-18">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Welcome to Your AI Knowledge Base</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Transform your documents into an intelligent, searchable knowledge base. Get started by
          importing your first documents.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Upload className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg">Import Documents</CardTitle>
            <CardDescription>Upload PDFs, Word docs, text files, and more</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Brain className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg">AI Processing</CardTitle>
            <CardDescription>
              Our AI analyzes and indexes your content automatically
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Zap className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg">Instant Answers</CardTitle>
            <CardDescription>
              Ask questions and get precise answers from your documents
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={() => setOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Import Your First Documents
        </Button>
      </div>

      {/* Supported Formats */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Supported formats:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['PDF'].map((format) => (
            <span
              key={format}
              className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-medium"
            >
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
