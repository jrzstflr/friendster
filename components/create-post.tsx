"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ImageIcon, Smile, MapPin } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"

export function CreatePost({ onCreatePost, currentUser }: any) {
  const [content, setContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<File[]>([])
  const [showMediaUpload, setShowMediaUpload] = useState(false)

  const handleSubmit = () => {
    if (content.trim() || selectedMedia.length > 0) {
      onCreatePost(content, selectedMedia)
      setContent("")
      setSelectedMedia([])
      setIsExpanded(false)
      setShowMediaUpload(false)
    }
  }

  return (
    <Card className="bg-card rounded-2xl shadow-md p-4 border border-border">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-primary flex-shrink-0">
          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's on your mind?"
            className="w-full p-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-medium text-foreground placeholder-muted-foreground transition-smooth text-sm lg:text-base"
            rows={isExpanded ? 4 : 2}
          />

          {showMediaUpload && (
            <div className="mt-3 p-3 bg-muted rounded-lg border border-border">
              <MediaUpload onMediaSelect={setSelectedMedia} />
            </div>
          )}

          {isExpanded && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-3 gap-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMediaUpload(!showMediaUpload)}
                  className="text-muted-foreground hover:text-foreground transition-smooth flex-1 sm:flex-none"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground flex-1 sm:flex-none"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground flex-1 sm:flex-none"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => {
                    setContent("")
                    setSelectedMedia([])
                    setIsExpanded(false)
                    setShowMediaUpload(false)
                  }}
                  className="rounded-lg font-medium border-border hover:bg-muted flex-1 sm:flex-none bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!content.trim() && selectedMedia.length === 0}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium shadow-md hover:shadow-lg transition-smooth disabled:opacity-50 flex-1 sm:flex-none"
                >
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
