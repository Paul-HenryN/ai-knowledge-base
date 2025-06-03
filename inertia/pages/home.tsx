import React, { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Send, Search, FileText, BookOpen, TrendingUp, Clock, Zap } from 'lucide-react'
import AppLayout from '@/components/layout/app-layout'
import { useForm } from '@inertiajs/react'
import { cn } from '@/lib/utils'

const suggestedPrompts = [
  {
    icon: Search,
    title: 'Search knowledge base',
  },
  {
    icon: FileText,
    title: 'Summarize document',
  },
  {
    icon: BookOpen,
    title: 'Explain concept',
  },
  {
    icon: TrendingUp,
    title: 'Find related topics',
  },
]

const recentDocuments = [
  {
    title: 'API Authentication Guide',
    category: 'Security',
    lastViewed: '2 hours ago',
  },
  {
    title: 'React Performance Best Practices',
    category: 'Frontend',
    lastViewed: '1 day ago',
  },
  {
    title: 'Database Schema Design',
    category: 'Backend',
    lastViewed: '2 days ago',
  },
  {
    title: 'CI/CD Pipeline Setup',
    category: 'DevOps',
    lastViewed: '3 days ago',
  },
  {
    title: 'User Interface Guidelines',
    category: 'Design',
    lastViewed: '1 week ago',
  },
]

const HomePage = () => {
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
          <Zap className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl">Welcome back, Paul-Henry</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Search through your knowledge base, get summaries, find related topics, or ask specific
            questions about your documents.
          </p>
        </div>
      </div>

      <div className="mb-12">
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

      {/* Suggested Prompts */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4">Try asking about...</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {suggestedPrompts.map((suggestion, index) => {
            const IconComponent = suggestion.icon

            return (
              <Card key={index} className="p-3 cursor-pointer ">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{suggestion.title}</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recently Viewed Documents */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock size={18} />
          Recently viewed documents
        </h3>
        <div className="space-y-2">
          {recentDocuments.map((doc, index) => (
            <Card key={index} className="p-3 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{doc.title}</h4>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Badge variant="secondary" className="text-xs">
                    {doc.category}
                  </Badge>
                  <span className="text-xs">{doc.lastViewed}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm">Total Documents</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">23</div>
          <div className="text-sm">Categories</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm">Recent Updates</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-slate-90">89%</div>
          <div className="text-sm">Search Accuracy</div>
        </Card>
      </div>
    </div>
  )
}

HomePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default HomePage
