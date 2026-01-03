import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card/card'
import { Textarea } from '@/components/ui/textarea'
import { Image } from '@/components/ui/image'
import { ArrowLeft, Heart, MessageSquare, Eye, Send } from 'lucide-react'
import type { Article } from '@/lib/data/articles'
import { ErrorBoundary } from '@/lib/context/ErrorBoundary'

interface Comment {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export function ArticleDetail({ article: initialArticle, onBack }: ArticleDetailProps) {
  const [article] = useState(initialArticle)
  const Content = article.content as React.ComponentType<any> // MDX component

  const [comments, setComments] = useState<Comment[]>([
    // Optional: seed with a few static comments
    { id: '1', userName: 'Jane Doe', content: 'Great article!', createdAt: '2025-11-01' },
  ])
  const [newComment, setNewComment] = useState('')
  
  useEffect(() => {
    // Increment article views in backend
    fetch(`${import.meta.env.VITE_BACKEND_URL}/articles/${article.id}/view`, {
      method: "POST",
    }).catch(err => console.error("Failed to record view", err))
  }, [article.id])

  const handleAddComment = () => {
    if (!newComment.trim()) return
    const comment: Comment = {
      id: `${comments.length + 1}`,
      userName: 'Guest',
      content: newComment,
      createdAt: new Date().toISOString(),
    }
    setComments(prev => [comment, ...prev])
    setNewComment('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-sage-50 to-mint-50 relative pt-30">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <div className="mb-8">
          <span className="inline-block bg-ocean-100 text-ocean-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-4">
            {article.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4 text-stone-600">
            <div>
              <div className="font-medium">{article.authorName}</div>
              <div className="text-sm">
                {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {article.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" /> {article.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> {comments.length}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="mb-8 rounded-2xl h-100 overflow-hidden shadow-xl">
            <Image
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <Card className="mb-12 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <ErrorBoundary>
              <div className="prose prose-sm md:prose-base max-w-none text-stone-700 leading-relaxed
    [&_h1]:text-3xl [&_h1]:font-light [&_h1]:tracking-tight [&_h1]:mt-0 [&_h1]:mb-6
    [&_h2]:text-xl [&_h2]:font-medium [&_h2]:mt-10 [&_h2]:mb-4
    [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2
    [&_p]:my-4
    [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1
    [&_a]:underline [&_a]:underline-offset-4
    [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-stone-600
  
              ">
                {Content ? (
                  <Content />
                ) : (
                  <p className="text-stone-500 italic">Content could not be loaded. Please check the browser console for errors.</p>
                )}
              </div>
            </ErrorBoundary>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-stone-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-sage-600" />
            Comments ({comments.length})
          </h2>

          {/* Add Comment Form */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="mb-4"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-gradient-to-r from-sage-500 to-mint-600 hover:from-sage-600 hover:to-mint-700 text-white rounded-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-stone-900">{comment.userName}</div>
                      <div className="text-sm text-stone-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-700 whitespace-pre-wrap">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-md bg-stone-50">
              <CardContent className="p-8 text-center text-stone-600">
                No comments yet. Be the first to share your thoughts!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}