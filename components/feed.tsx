"use client"

import { useState } from "react"
import { CreatePost } from "@/components/create-post"
import { PostCard } from "@/components/post-card"

export function Feed({ currentUser }: { currentUser: any }) {
  const [posts, setPosts] = useState<any[]>([])

  const handleCreatePost = (content: string) => {
    const newPost = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      liked: false,
    }
    setPosts([newPost, ...posts])
  }

  return (
    <div className="space-y-6">
      <CreatePost onCreatePost={handleCreatePost} currentUser={currentUser} />

      {posts.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center border-0">
          <p className="text-gray-500 text-lg">No posts yet. Be the first to share!</p>
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} currentUser={currentUser} />)
      )}
    </div>
  )
}
