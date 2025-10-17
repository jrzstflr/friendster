"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function CreatePost({ onCreatePost, currentUser }: any) {
  const [content, setContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content)
      setContent("")
      setIsExpanded(false)
    }
  }

  return (
    <Card className="bg-white rounded-3xl shadow-lg p-6 border-0 border-t-4 border-orange-400">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12 border-2 border-orange-400 flex-shrink-0">
          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's on your mind?"
            className="w-full p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none font-medium text-gray-800 placeholder-gray-500 transition-all"
            rows={isExpanded ? 4 : 2}
          />

          {isExpanded && (
            <div className="flex justify-end gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2">
              <Button
                variant="outline"
                onClick={() => {
                  setContent("")
                  setIsExpanded(false)
                }}
                className="rounded-xl font-bold border-2 border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
