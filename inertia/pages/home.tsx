import React, { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, Clock, Zap, Brain } from 'lucide-react'
import AppLayout from '@/components/layout/app-layout'
import { Link, useForm } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { InferPageProps } from '@adonisjs/inertia/types'
import HomeController from '#controllers/home_controller'

const HomePage = ({ recentlyViewedDocuments }: InferPageProps<HomeController, 'handle'>) => {
  const { data, setData, post, processing } = useForm({
    userInput: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('chat')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Welcome Section */}
      <div className="text-center space-y-6 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <Brain className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl">Welcome back, Paul-Henry</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Search through your knowledge base, get summaries, find related topics, or ask specific
            questions about your documents.
          </p>
        </div>
      </div>

      <div className="mb-24">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <form className="flex-1 relative" onSubmit={handleSubmit}>
            <Input
              value={data.userInput}
              onChange={(e) => setData('userInput', e.target?.value)}
              placeholder="Ask about your documents, search for topics, or request summaries..."
              className="pr-12 h-18 text-base"
              disabled={processing}
            />

            <Button
              type="submit"
              size="icon"
              disabled={!data.userInput || processing}
              className={cn('absolute bottom-2 right-2', processing && 'animate-pulse')}
            >
              <Send />
            </Button>
          </form>
        </div>
      </div>

      {/* Recently Viewed Documents */}
      <div className="max-w-2xl mx-auto">
        <h3 className="mb-4 flex items-center gap-2">
          <Clock size={18} />
          Recent documents
        </h3>
        <div className="flex flex-col gap-3">
          {recentlyViewedDocuments.map((doc, index) => (
            <Link key={index} href={`/documents/${doc.id}`}>
              <Card className="p-3 cursor-pointer bg-accent">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{doc.name}</h4>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-xs">Viewed {doc.lastViewedAt}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

HomePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default HomePage
