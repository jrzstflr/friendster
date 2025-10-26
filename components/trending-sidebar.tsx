"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Search } from "lucide-react"

export function TrendingSidebar() {
  const trendingTopics = [
    { id: 1, tag: "#WebDevelopment", posts: 12500, trend: "up" },
    { id: 2, tag: "#ReactJS", posts: 9800, trend: "up" },
    { id: 3, tag: "#DesignTrends", posts: 8200, trend: "up" },
    { id: 4, tag: "#StartupLife", posts: 7100, trend: "down" },
    { id: 5, tag: "#TechNews", posts: 6500, trend: "up" },
  ]

  const recommendations = [
    { id: 1, name: "Alex Rivera", role: "Product Designer", mutual: 12 },
    { id: 2, name: "Jordan Lee", role: "Full Stack Dev", mutual: 8 },
    { id: 3, name: "Casey Morgan", role: "UX Researcher", mutual: 5 },
  ]

  return (
    <div className="space-y-6 hidden lg:block">
      <Card className="bg-card rounded-2xl shadow-md p-4 border border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Friendster..."
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground placeholder-muted-foreground transition-all duration-300 ease-out"
          />
        </div>
      </Card>

      <Card className="bg-card rounded-2xl shadow-md p-4 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">Trending Now</h3>
        </div>

        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <button key={topic.id} className="w-full text-left p-3 rounded-lg hover:bg-muted transition-all duration-300 ease-out group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-bold text-foreground group-hover:text-primary transition-all duration-300 ease-out">{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
                </div>
                <span
                  className={`text-xs font-bold ${topic.trend === "up" ? "text-secondary" : "text-muted-foreground"}`}
                >
                  {topic.trend === "up" ? "↑" : "↓"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="bg-card rounded-2xl shadow-md p-4 border border-border">
        <h3 className="font-bold text-foreground mb-4">Suggested For You</h3>

        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-all duration-300 ease-out"
            >
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm">{rec.name}</p>
                <p className="text-xs text-muted-foreground">{rec.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{rec.mutual} mutual friends</p>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium text-xs"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-muted rounded-2xl shadow-md p-4 border border-border text-center">
        <p className="text-xs text-muted-foreground">Help us improve Friendster by sharing your feedback</p>
        <Button
          variant="outline"
          className="w-full mt-3 rounded-lg border-border hover:bg-card font-medium text-sm bg-transparent"
        >
          Send Feedback
        </Button>
      </Card>
    </div>
  )
}
