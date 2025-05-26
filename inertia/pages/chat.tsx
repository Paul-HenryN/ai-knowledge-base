import { useForm } from '@inertiajs/react'
import React from 'react'

type Message = {
  text: string
  fromUser: boolean
}

export default function ChatPage() {
  const { data, setData, post } = useForm({
    message: '',
  })
  const [conversation, setConversation] = React.useState<Message[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/chat', {
      onSuccess: (params) => {
        setConversation([...conversation, { text: params.props.message as string, fromUser: true }])
      },
    })
  }

  return (
    <main className="h-screen w-full grid place-items-center">
      <div className="mt-4">
        {conversation.map((msg, index) => (
          <div key={index} className={msg.fromUser ? 'text-right' : 'text-left'}>
            <p>
              {msg.fromUser ? 'you:' : 'bot:'} {msg.text}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="border"
          value={data.message}
          onChange={(e) => setData('message', e.target?.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  )
}
