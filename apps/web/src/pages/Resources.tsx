import { useState, useEffect } from 'react'
import { getArticles, type Article } from '@/lib/data/articles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { Image } from '@/components/ui/image'
import { ArticleDetail } from './ResourcesDetail'
import { CategoryChips } from '@/lib/blocks/CategoryChips'
import MassageApprentice from './MassageApprentice'

const getCategoryColor = (category: string) => {
  const colors = {
    "Benefits": "bg-ocean-100 text-ocean-700",
    "Wellness": "bg-sage-100 text-sage-700",
    "Prevention": "bg-lavender-100 text-lavender-700",
    "NAET": "bg-amber-100 text-amber-700"
  }
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
}

export default function Resources() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    setArticles(getArticles())

    const params = new URLSearchParams(window.location.search)
    setActiveCategory(params.get("category") || "all")
  }, [])

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    )
  }

  useEffect(() => {
  const openFromUrl = () => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get("article")
    if (!slug) return setSelectedArticle(null)

    const found = getArticles().find(a => a.id === slug)
    if (found) setSelectedArticle(found)
  }

  openFromUrl()
  window.addEventListener("popstate", openFromUrl)
  return () => window.removeEventListener("popstate", openFromUrl)
}, [])

  const featuredArticles = articles.filter(a => a.featured).slice(0, 1)
  const regularArticles = articles.filter(a => !a.featured)


  return (
    <section id="resources" className="relative pt-50 pb-24 bg-linear-to-b from-white to-gray-50" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <Badge variant="outline" className="text-sm px-4 py-1">
              Resources & Articles
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">
            Health & Wellness Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tips, and guides to help you achieve optimal health and maintain a pain-free lifestyle.
          </p>
        </div>
        <div className="w-full pt-2 pb-16">
          <CategoryChips value={activeCategory} onChange={setActiveCategory} />
        </div>

        {activeCategory === "apprenticeship" ? (
          <MassageApprentice />
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticles.length > 0 && (
              <Card className="mb-12 overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 h-100 gap-0">
                  <div className="relative h-20 md:h-full overflow-hidden">
                    <Image
                      src={featuredArticles[0].imageUrl}
                      alt={featuredArticles[0].title}
                      className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      Featured
                    </Badge>
                  </div>

                  <div className="flex flex-col justify-start p-8 md:p-12">
                    <Badge className={`w-fit mb-4 ${getCategoryColor(featuredArticles[0].category)}`}>
                      {featuredArticles[0].category}
                    </Badge>

                    <h3 className="text-3xl mb-4">{featuredArticles[0].title}</h3>

                    <p className="text-gray-600 mb-6 text-lg line-clamp-2">
                      {featuredArticles[0].excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <span>{featuredArticles[0].authorName}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredArticles[0].createdAt}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredArticles[0].readTime}</span>
                      </div>
                    </div>

                    <Button
                      className="w-fit group"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedArticle(featuredArticles[0])
                      }}
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
            {/* Other Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden flex-col border-0 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>{article.createdAt}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="text-sm text-gray-600">{article.authorName}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
    <div className="text-center mt-12">
      <Button variant="outlined" size="lg" className="group">
        View All Articles
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  </>
)}
</div>
    </section>
  )
}
