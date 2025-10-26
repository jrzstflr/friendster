"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"

export function PostCard({ post, currentUser }: any) {
  const [liked, setLiked] = useState(post.liked)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(post.comments || [])
  const [commentText, setCommentText] = useState("")
  const [isLikeLoading, setIsLikeLoading] = useState(false)
  const [isCommentLoading, setIsCommentLoading] = useState(false)

  const handleLike = async () => {
    setIsLikeLoading(true)
    // Optimistic update
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      // Revert on error
      setLiked(liked)
      setLikes(likes)
      console.error('Failed to update like status:', error)
    } finally {
      setIsLikeLoading(false)
    }
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) return

    setIsCommentLoading(true)
    const newComment = {
      id: Date.now().toString(),
      author: currentUser,
      text: commentText,
      timestamp: new Date().toISOString(),
    }

    // Optimistic update
    setComments([...comments, newComment])
    setCommentText("")

    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      // Revert on error
      setComments(comments)
      setCommentText(commentText)
      console.error('Failed to add comment:', error)
    } finally {
      setIsCommentLoading(false)
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
    <Card className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Avatar className="h-12 w-12 border-2 border-primary flex-shrink-0">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{formatDate(post.timestamp)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>

        {post.media && post.media.length > 0 && (
          <div className={`mt-4 grid gap-2 ${post.media.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {post.media.map((media: any, idx: number) => (
              <div key={idx} className="relative bg-muted rounded-lg overflow-hidden">
                {media.type.startsWith("image") ? (
                  <img
                    src={media.url || "/placeholder.svg"}
                    alt={`Post media ${idx}`}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <video src={media.url} className="w-full h-64 object-cover" controls />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex gap-4">
          {likes > 0 && <span className="hover:underline cursor-pointer">{likes} likes</span>}
          {comments.length > 0 && <span className="hover:underline cursor-pointer">{comments.length} comments</span>}
        </div>
      </div>

      <div className="flex gap-0 px-2 py-2 border-t border-border">
        <Button
          onClick={handleLike}
          variant="ghost"
          className={`flex-1 rounded-lg font-medium text-sm transition-all duration-300 ease-out flex items-center justify-center gap-2 ${
            liked
              ? "text-secondary bg-secondary/10 hover:bg-secondary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          Like
        </Button>
        <Button
          onClick={() => setShowComments(!showComments)}
          variant="ghost"
          className="flex-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg font-medium text-sm transition-all duration-300 ease-out flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Comment
        </Button>
        <Button
          variant="ghost"
          className="flex-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg font-medium text-sm transition-all duration-300 ease-out flex items-center justify-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      {showComments && (
        <div className="border-t border-border p-4 space-y-3 bg-muted/30 animate-in fade-in slide-in-from-top-2">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 border border-border flex-shrink-0">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-card rounded-lg p-3 border border-border">
                  <p className="font-bold text-sm text-foreground">{comment.author.name}</p>
                  <p className="text-sm text-foreground mt-1">{comment.text}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(comment.timestamp)}</p>
                </div>
              </div>
            ))
          )}

          <div className="flex gap-2 mt-4 pt-3 border-t border-border">
            <Avatar className="h-8 w-8 border border-border flex-shrink-0">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment()
                  }
                }}
                className="flex-1 px-3 py-2 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground placeholder-muted-foreground transition-smooth"
              />
              <Button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 font-medium text-sm disabled:opacity-50 transition-smooth"
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
