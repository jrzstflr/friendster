"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { ReactionPicker, type ReactionType } from "@/components/reaction-picker"
import { CommentSection } from "@/components/comment-section"

export function PostCard({ post, currentUser }: any) {
  const [reactions, setReactions] = useState<{ [key: string]: ReactionType }>(post.reactions || {})
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<any[]>(post.comments || [])

  const handleReaction = async (reaction: ReactionType) => {
    const newReactions = { ...reactions }
    if (newReactions[currentUser.id] === reaction) {
      delete newReactions[currentUser.id]
    } else {
      newReactions[currentUser.id] = reaction
    }
    setReactions(newReactions)

    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
    } catch (error) {
      console.error("[v0] Failed to update reaction:", error)
      setReactions(reactions)
    }
  }

  const handleAddComment = (text: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: currentUser,
      text,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: [],
    }
    setComments([...comments, newComment])
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    )
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId))
  }

  const handleReplyComment = (commentId: string, text: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: Date.now().toString(),
                author: currentUser,
                text,
                timestamp: new Date().toISOString(),
                likes: 0,
                liked: false,
                replies: [],
              },
            ],
          }
        }
        return comment
      }),
    )
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

  const reactionCounts: { [key in ReactionType]: number } = {
    like: 0,
    love: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  }

  Object.values(reactions).forEach((reaction) => {
    reactionCounts[reaction]++
  })

  const currentUserReaction = reactions[currentUser.id]
  const totalReactions = Object.keys(reactions).length

  const reactionEmojis: { [key in ReactionType]: string } = {
    like: "👍",
    love: "❤️",
    haha: "😂",
    wow: "😮",
    sad: "😢",
    angry: "😠",
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
          {totalReactions > 0 && (
            <div className="flex items-center gap-1 hover:underline cursor-pointer">
              <div className="flex -space-x-1">
                {Object.entries(reactionCounts)
                  .filter(([_, count]) => count > 0)
                  .slice(0, 3)
                  .map(([reaction]) => (
                    <span key={reaction} className="text-sm">
                      {reactionEmojis[reaction as ReactionType]}
                    </span>
                  ))}
              </div>
              <span>{totalReactions}</span>
            </div>
          )}
          {comments.length > 0 && <span className="hover:underline cursor-pointer">{comments.length} comments</span>}
        </div>
      </div>

      <div className="flex gap-0 px-2 py-2 border-t border-border">
        <ReactionPicker onReactionSelect={handleReaction} currentReaction={currentUserReaction} />
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
        <CommentSection
          comments={comments}
          currentUser={currentUser}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
          onReplyComment={handleReplyComment}
        />
      )}
    </Card>
  )
}
