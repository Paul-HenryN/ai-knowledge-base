import Document from '#models/document'
import { useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

type FormData = {
  file: File | null
}

export default function CreateEmbeddingPage({
  error,
  document,
}: {
  error?: string
  document?: Document
}) {
  const { setData, post } = useForm<FormData>({
    file: null,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    post('/embeddings/create')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setData('file', file)
  }

  return (
    <div>
      <h1>Create Embedding</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} name="file" />
        <button type="submit">Create Embedding</button>
      </form>

      {error && <p className="error text-red-500">{error}</p>}

      {document && (
        <div>
          <h2>Embedding Created</h2>
          <pre>{JSON.stringify(document, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
