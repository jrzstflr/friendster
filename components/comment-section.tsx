"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, X } from "lucide-react"

interface Comment {
  id: string
  author: any
  text: string
  timestamp: string
  likes: number
  liked: boolean
  replies: Comment[]
}

interface CommentSectionProps {
  comments: Comment[]
  currentUser: any
  onAddComment: (text: string) => void
  onLikeComment: (commentId: string) => void
  onDeleteComment: (commentId: string) => void
  onReplyComment: (commentId: string, text: string) => void
}

export function CommentSection({
  comments,
  currentUser,
  onAddComment,
  onLikeComment,
  onDeleteComment,
  onReplyComment,
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())

  const handleAddComment = () => {
    if (!commentText.trim()) return
    onAddComment(commentText)
    setCommentText("")
  }

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return
    onReplyComment(commentId, replyText)
    setReplyText("")
    setReplyingTo(null)
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

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies)
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId)
    } else {
      newExpanded.add(commentId)
    }
    setExpandedReplies(newExpanded)
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex gap-3 ${isReply ? "ml-8" : ""}`}>
      <Avatar className="h-8 w-8 border border-border flex-shrink-0">
        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-card rounded-lg p-3 border border-border">
          <p className="font-bold text-sm text-foreground">{comment.author.name}</p>
          <p className="text-sm text-foreground mt-1">{comment.text}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>{formatDate(comment.timestamp)}</span>
            {comment.likes > 0 && <span className="flex items-center gap-1">❤️ {comment.likes}</span>}
          </div>
        </div>
        <div className="flex gap-2 mt-2 text-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLikeComment(comment.id)}
            className={`h-6 px-2 ${comment.liked ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Heart className={`h-3 w-3 ${comment.liked ? "fill-current" : ""}`} />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="h-6 px-2 text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="h-3 w-3" />
            Reply
          </Button>
          {comment.author.id === currentUser.id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteComment(comment.id)}
              className="h-6 px-2 text-muted-foreground hover:text-red-500"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {replyingTo === comment.id && (
          <div className="mt-3 flex gap-2">
            <Avatar className="h-6 w-6 border border-border flex-shrink-0">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddReply(comment.id)
                  }
                }}
                className="flex-1 px-2 py-1 bg-input rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs text-foreground placeholder-muted-foreground"
              />
              <Button
                onClick={() => handleAddReply(comment.id)}
                disabled={!replyText.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded px-3 py-1 font-medium text-xs disabled:opacity-50"
              >
                Reply
              </Button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleReplies(comment.id)}
              className="h-6 px-2 text-xs text-primary hover:bg-muted"
            >
              {expandedReplies.has(comment.id) ? "Hide" : "Show"} {comment.replies.length} repl
              {comment.replies.length === 1 ? "y" : "ies"}
            </Button>
            {expandedReplies.has(comment.id) && (
              <div className="mt-3 space-y-3 border-l-2 border-border pl-3">
                {comment.replies.map((reply) => renderComment(reply, true))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="border-t border-border p-4 space-y-3 bg-muted/30 animate-in fade-in slide-in-from-top-2">
      {comments.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-4">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-3">{comments.map((comment) => renderComment(comment))}</div>
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
  )
}
