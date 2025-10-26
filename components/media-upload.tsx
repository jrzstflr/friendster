"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

export function MediaUpload({ onMediaSelect }: any) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newFiles = [...selectedFiles, ...files].slice(0, 4)

    setSelectedFiles(newFiles)

    const newPreviews = newFiles.map((file) => {
      return URL.createObjectURL(file)
    })
    setPreviews(newPreviews)
    onMediaSelect(newFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)

    setSelectedFiles(newFiles)
    setPreviews(newPreviews)
    onMediaSelect(newFiles)

    URL.revokeObjectURL(previews[index])
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {previews.length === 0 ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-border rounded-lg p-6 hover:bg-muted transition-all duration-300 ease-out text-center cursor-pointer group"
        >
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-foreground transition-all duration-300 ease-out" />
          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, MP4 up to 10MB</p>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded-lg border border-border"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {previews.length < 4 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-4 hover:bg-muted transition-all duration-300 ease-out flex items-center justify-center cursor-pointer"
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
