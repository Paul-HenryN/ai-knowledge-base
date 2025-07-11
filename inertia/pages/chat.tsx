import { Send } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { InferPageProps } from '@adonisjs/inertia/types'
import ChatsController from '#controllers/chats_controller'
import { TypewriterMessage } from '@/components/typewriter-message'
import { useForm } from '@inertiajs/react'

type ChatPageProps = InferPageProps<ChatsController, 'show'>
type Message = ChatPageProps['chat']['messages'][number]

export default function ChatPage({ chat, flash }: ChatPageProps) {
  const { data, setData, put, processing } = useForm({
    userInput: '',
  })

  const [conversation, setConversation] = useState<Message[]>(chat.messages)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!data.userInput) return

    setConversation((prev) => [
      ...prev,
      {
        id: conversation.length + 1,
        text: data.userInput,
        createdAt: new Date().toString(),
        type: 'user',
      },
    ])

    put(`/chat/${chat.id}`, {
      onSuccess: (page) => {
        setConversation((page.props.chat as ChatPageProps['chat']).messages)
        setData({ userInput: '' })
      },
    })
  }

  useEffect(() => {
    const lastMessage = conversation[conversation.length - 1]

    if (lastMessage) {
      document
        .getElementById(`message-${lastMessage.id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [conversation])

  return (
    <div>
      <ScrollArea className="h-[75svh]">
        <div className="flex flex-col gap-15 max-w-4xl mx-auto pb-20">
          {conversation.map((message) =>
            message.type === 'ai' ? (
              <BotMessage
                id={`message-${message.id}`}
                text={message.text}
                animate={flash.botResponseId && message.id === flash.botResponseId}
              />
            ) : (
              <UserMessage
                id={`message-${message.id}`}
                text={message.text}
                className="justify-end"
              />
            )
          )}

          {processing && <Skeleton className="size-10" />}
        </div>
      </ScrollArea>

      <div className="max-w-4xl mx-auto">
        <form className="flex gap-2 relative" onSubmit={handleSubmit}>
          <Input
            placeholder="Ask a question about your documents..."
            value={data.userInput}
            onChange={(e) => setData('userInput', e.target?.value)}
            className="h-20 border-none rounded-lg px-5 pb-2 dark:bg-muted"
            disabled={processing}
          />

          <Button
            type="submit"
            size="icon"
            className="px-3 absolute bottom-4 right-4"
            disabled={!data.userInput || processing}
          >
            <Send />
          </Button>
        </form>

        <p className="text-xs text-center mt-3">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}

const BotMessage = ({
  text,
  animate = false,
  id,
}: {
  text: string
  animate?: boolean
  id?: string
}) => {
  return animate ? (
    <TypewriterMessage id={id} message={text} />
  ) : (
    <pre className="text-md whitespace-pre-line">{text}</pre>
  )
}

const UserMessage = ({ text, className, id }: { text: string; className?: string; id: string }) => {
  return (
    <div className={cn('flex items-center gap-2', className)} id={id}>
      <div>
        <div className="rounded-lg p-3 bg-blue-500">
          <pre className="text-md whitespace-pre-line">{text}</pre>
        </div>
      </div>

      <Avatar className="size-10">
        <AvatarFallback>PH</AvatarFallback>
      </Avatar>
    </div>
  )
}
