"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Search, Users } from "lucide-react"

export function DiscoverPage({ currentUser, users }: any) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "tech", "design", "music", "sports", "travel"]

  const filteredUsers = users.filter((user: any) => {
    if (user.id === currentUser.id) return false
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || user.interests?.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <Card className="bg-card rounded-2xl shadow-md p-6 border border-border">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground transition-smooth"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-smooth capitalize ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No users found. Try adjusting your search.</p>
          </div>
        ) : (
          filteredUsers.map((user: any) => (
            <Card
              key={user.id}
              className="bg-card rounded-2xl shadow-md p-6 border border-border hover:shadow-lg transition-smooth"
            >
              <div className="text-center mb-4">
                <Avatar className="h-16 w-16 border-2 border-primary mx-auto mb-3">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">@{user.email?.split("@")[0]}</p>
              </div>

              {user.interests && user.interests.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {user.interests.slice(0, 3).map((interest: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              )}

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-smooth">
                Add Friend
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
