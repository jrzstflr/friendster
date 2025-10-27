"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry"

interface ReactionPickerProps {
  onReactionSelect: (reaction: ReactionType) => void
  currentReaction?: ReactionType
}

const REACTIONS: Array<{ type: ReactionType; label: string; icon: React.ReactNode; color: string }> = [
  { type: "like", label: "Like", icon: "👍", color: "text-blue-500" },
  { type: "love", label: "Love", icon: "❤️", color: "text-red-500" },
  { type: "haha", label: "Haha", icon: "😂", color: "text-yellow-500" },
  { type: "wow", label: "Wow", icon: "😮", color: "text-yellow-400" },
  { type: "sad", label: "Sad", icon: "😢", color: "text-yellow-600" },
  { type: "angry", label: "Angry", icon: "😠", color: "text-red-600" },
]

export function ReactionPicker({ onReactionSelect, currentReaction }: ReactionPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleReactionClick = (reaction: ReactionType) => {
    onReactionSelect(reaction)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg font-medium text-sm transition-all duration-300 ease-out flex items-center justify-center gap-2"
      >
        <Heart className={`h-4 w-4 ${currentReaction ? "fill-current" : ""}`} />
        React
      </Button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-card border border-border rounded-full shadow-lg p-2 flex gap-1 z-50 animate-in fade-in scale-in-95">
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => handleReactionClick(reaction.type)}
              className={`text-2xl hover:scale-125 transition-transform duration-200 p-1 rounded-full ${
                currentReaction === reaction.type ? "bg-muted scale-110" : "hover:bg-muted"
              }`}
              title={reaction.label}
            >
              {reaction.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
