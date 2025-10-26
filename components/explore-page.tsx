"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, TrendingUp, Clock } from "lucide-react"

export function ExplorePage() {
  const [activeTab, setActiveTab] = useState("trending")

  const trendingPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends in web development and what's coming next...",
      author: "Sarah Chen",
      engagement: 2500,
      category: "Tech",
    },
    {
      id: 2,
      title: "Design Systems Best Practices",
      excerpt: "A comprehensive guide to building scalable design systems...",
      author: "Mike Johnson",
      engagement: 1800,
      category: "Design",
    },
    {
      id: 3,
      title: "Remote Work Culture",
      excerpt: "How to build a thriving remote team culture...",
      author: "Emma Davis",
      engagement: 1500,
      category: "Business",
    },
  ]

  const hotPosts = [
    {
      id: 1,
      title: "Breaking: New AI Model Released",
      excerpt: "OpenAI releases groundbreaking new model...",
      author: "Tech News Daily",
      engagement: 5200,
      category: "News",
    },
    {
      id: 2,
      title: "Startup Raises $50M Series B",
      excerpt: "Local startup announces major funding round...",
      author: "Startup Weekly",
      engagement: 3800,
      category: "Business",
    },
  ]

  const recentPosts = [
    {
      id: 1,
      title: "Just launched my new project!",
      excerpt: "Excited to share what I've been working on...",
      author: "Alex Rivera",
      engagement: 120,
      category: "Personal",
    },
    {
      id: 2,
      title: "Quick tip for productivity",
      excerpt: "Here's a simple technique that changed my workflow...",
      author: "Jordan Lee",
      engagement: 85,
      category: "Tips",
    },
  ]

  const posts = activeTab === "trending" ? trendingPosts : activeTab === "hot" ? hotPosts : recentPosts

  return (
    <div className="space-y-6">
      <Card className="bg-card rounded-2xl shadow-md p-4 border border-border">
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab("trending")}
            className={`flex-1 rounded-lg font-medium transition-smooth flex items-center justify-center gap-2 ${
              activeTab === "trending"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-border"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Trending
          </Button>
          <Button
            onClick={() => setActiveTab("hot")}
            className={`flex-1 rounded-lg font-medium transition-smooth flex items-center justify-center gap-2 ${
              activeTab === "hot"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-border"
            }`}
          >
            <Flame className="h-4 w-4" />
            Hot
          </Button>
          <Button
            onClick={() => setActiveTab("recent")}
            className={`flex-1 rounded-lg font-medium transition-smooth flex items-center justify-center gap-2 ${
              activeTab === "recent"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-border"
            }`}
          >
            <Clock className="h-4 w-4" />
            Recent
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-card rounded-2xl shadow-md p-6 border border-border hover:shadow-lg transition-smooth cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-smooth">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex-shrink-0 ml-4">
                {post.category}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{post.author}</span>
              </div>
              <div className="text-sm text-muted-foreground">{post.engagement.toLocaleString()} engagements</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
