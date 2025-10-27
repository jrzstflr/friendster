"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"

interface AvatarUploadProps {
  currentAvatar: string
  userName: string
  onAvatarChange: (avatarUrl: string) => void
}

export function AvatarUpload({ currentAvatar, userName, onAvatarChange }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string>(currentAvatar)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPreview(result)
      onAvatarChange(result)
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = () => {
    setPreview("")
    onAvatarChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
          <AvatarImage src={preview || "/placeholder.svg"} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white p-2 rounded-full shadow-lg transition-all duration-300"
          disabled={isLoading}
        >
          <Camera className="h-5 w-5" />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isLoading}
      />

      <div className="flex gap-2">
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
        >
          {isLoading ? "Uploading..." : "Change Avatar"}
        </Button>
        {preview && (
          <Button
            onClick={handleRemoveAvatar}
            variant="outline"
            className="border-border hover:bg-muted rounded-lg font-medium bg-transparent"
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        )}
      </div>
    </div>
  )
}
