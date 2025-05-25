import Document from '#models/document'
import { useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function CreateEmbeddingPage({
  error,
  document,
}: {
  error?: string
  document?: Document
}) {
  const { data, setData, post } = useForm({
    text: '',
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    post('/embeddings/create')
  }

  return (
    <div>
      <h1>Create Embedding</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={data.text}
          onChange={(e) => setData({ text: e.target.value })}
          placeholder="Enter text to embed"
        />
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
