"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function PostCard({ post, currentUser }: any) {
  const [liked, setLiked] = useState(post.liked)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(post.comments || [])
  const [commentText, setCommentText] = useState("")

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: currentUser,
        text: commentText,
        timestamp: new Date().toISOString(),
      }
      setComments([...comments, newComment])
      setCommentText("")
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <Card className="bg-white rounded-3xl shadow-lg p-6 border-0 border-l-4 border-orange-400 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-12 w-12 border-2 border-orange-400 flex-shrink-0">
          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <p className="font-bold text-gray-800">{post.author.name}</p>
          <p className="text-xs text-gray-500">{formatDate(post.timestamp)}</p>
        </div>
      </div>

      <p className="text-gray-800 mb-4 leading-relaxed text-base">{post.content}</p>

      <div className="flex gap-1 pt-4 border-t-2 border-gray-100">
        <Button
          onClick={handleLike}
          variant="ghost"
          className={`flex-1 rounded-xl font-bold transition-all ${
            liked ? "bg-pink-100 text-pink-600 hover:bg-pink-200" : "text-gray-600 hover:bg-orange-100"
          }`}
        >
          {liked ? "❤️" : "🤍"} Like ({likes})
        </Button>
        <Button
          onClick={() => setShowComments(!showComments)}
          variant="ghost"
          className="flex-1 text-gray-600 hover:bg-orange-100 rounded-xl font-bold transition-all"
        >
          💬 Comment ({comments.length})
        </Button>
        <Button
          variant="ghost"
          className="flex-1 text-gray-600 hover:bg-orange-100 rounded-xl font-bold transition-all"
        >
          ↗️ Share
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t-2 border-gray-100 space-y-3 animate-in fade-in slide-in-from-top-2">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
          ) : (
            comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-3 p-3 bg-orange-50 rounded-2xl">
                <Avatar className="h-8 w-8 border border-orange-300 flex-shrink-0">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-800">{comment.author.name}</p>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(comment.timestamp)}</p>
                </div>
              </div>
            ))
          )}

          {/* Add Comment */}
          <div className="flex gap-2 mt-3">
            <Avatar className="h-8 w-8 border border-orange-300 flex-shrink-0">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment()
                  }
                }}
                className="flex-1 px-3 py-2 bg-orange-50 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
              <Button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 font-bold text-sm disabled:opacity-50"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
