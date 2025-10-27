"use client"

import { useState } from "react"
import { CreatePost } from "@/components/create-post"
import { PostCard } from "@/components/post-card"

export function Feed({ currentUser }: { currentUser: any }) {
  const [posts, setPosts] = useState<any[]>([])

  const handleCreatePost = (content: string, mediaFiles: File[]) => {
    const processMedia = async () => {
      const mediaPromises = mediaFiles.map(
        (file) =>
          new Promise<{ type: string; url: string }>((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              resolve({
                type: file.type,
                url: e.target?.result as string,
              })
            }
            reader.readAsDataURL(file)
          }),
      )

      const media = await Promise.all(mediaPromises)

      const newPost = {
        id: Date.now().toString(),
        author: currentUser,
        content,
        media: media.length > 0 ? media : undefined,
        timestamp: new Date().toISOString(),
        reactions: {},
        comments: [],
      }
      setPosts([newPost, ...posts])
    }

    if (mediaFiles.length > 0) {
      processMedia()
    } else {
      const newPost = {
        id: Date.now().toString(),
        author: currentUser,
        content,
        timestamp: new Date().toISOString(),
        reactions: {},
        comments: [],
      }
      setPosts([newPost, ...posts])
    }
  }

  return (
    <div className="space-y-4">
      <CreatePost onCreatePost={handleCreatePost} currentUser={currentUser} />

      {posts.length === 0 ? (
        <div className="bg-card rounded-2xl shadow-md p-12 text-center border border-border">
          <p className="text-muted-foreground text-lg">No posts yet. Be the first to share something amazing!</p>
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} currentUser={currentUser} />)
      )}
    </div>
  )
}
