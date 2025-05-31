import { Send } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { FormEvent, useState } from 'react'
import { axios } from '@/lib/axios'
import { Skeleton } from './ui/skeleton'
import { TypewriterMessage } from './typewriter-message'

type Message = {
  id: number
  message: string
  type: 'user' | 'ai'
  animate?: boolean
}

export function Chat() {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message) return
    setLoading(true)
    setConversation((prev) => [...prev, { id: conversation.length + 1, message, type: 'user' }])
    setMessage('')

    try {
      const res = await axios.post('/chat', { message })
      setLoading(false)
      setConversation((prev) => [
        ...prev,
        { id: conversation.length + 1, message: res.data.botResponse, type: 'ai', animate: true },
      ])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-2 h-[80%]">
        <div className="space-y-4">
          {conversation.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
            >
              {message.type === 'ai' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">AI</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.animate ? (
                    <TypewriterMessage message={message.message} />
                  ) : (
                    <p className="text-sm whitespace-pre-line">{message.message}</p>
                  )}
                </div>
              </div>
              {message.type === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-200">U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {loading && <Skeleton className="size-10" />}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Ask a question about your documents..."
            value={message}
            onChange={(e) => setMessage(e.target?.value)}
            className="pr-10"
            disabled={loading}
          />

          <Button
            type="submit"
            size="icon"
            variant="outline"
            className="px-3"
            disabled={!message || loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-center text-gray-400 mt-2">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </>
  )
}
