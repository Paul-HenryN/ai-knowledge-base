import { Send } from 'lucide-react'
import React, { FormEvent, useEffect, useState } from 'react'
import { axios } from '@/lib/axios'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TypewriterMessage } from '@/components/typewriter-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import AppLayout from '@/components/layout/app-layout'
import { cn } from '@/lib/utils'

type Message = {
  id: number
  message: string
  type: 'user' | 'ai'
  animate?: boolean
}

export function ChatPage() {
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

  useEffect(() => {
    const lastMessage = conversation[conversation.length - 1]

    if (lastMessage) {
      document.getElementById(`message-${lastMessage.id}`)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [conversation])

  return (
    <div>
      <ScrollArea className="p-2 h-[70svh]">
        <div>
          {conversation.map((message) => (
            <div
              key={message.id}
              id={`message-${message.id}`}
              className={cn('flex gap-3 my-9', message.type === 'user' && 'justify-end')}
            >
              {message.type === 'ai' && (
                <Avatar className="size-10">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-[50%] ${message.type === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === 'user' ? 'bg-blue-500' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.animate ? (
                    <TypewriterMessage message={message.message} />
                  ) : (
                    <pre className="text-sm whitespace-pre-line">{message.message}</pre>
                  )}
                </div>
              </div>

              {message.type === 'user' && (
                <Avatar className="size-10">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex gap-3 my-9">
            <Avatar className="size-10">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>

            <Skeleton className="size-10" />
          </div>
        )}
      </ScrollArea>

      <div>
        <form className="flex gap-2 relative" onSubmit={handleSubmit}>
          <Input
            placeholder="Ask a question about your documents..."
            value={message}
            onChange={(e) => setMessage(e.target?.value)}
            className="h-20 border-none rounded-lg px-5 pb-2"
            disabled={loading}
          />

          <Button
            type="submit"
            size="icon"
            className="px-3 absolute bottom-4 right-4"
            disabled={!message || loading}
          >
            <Send />
          </Button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-3">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}

ChatPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default ChatPage
