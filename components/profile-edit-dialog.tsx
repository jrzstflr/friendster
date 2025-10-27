"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AvatarUpload } from "@/components/avatar-upload"
import { X } from "lucide-react"

interface ProfileEditDialogProps {
  isOpen: boolean
  onClose: () => void
  user: any
  onSave: (updatedUser: any) => void
}

export function ProfileEditDialog({ isOpen, onClose, user, onSave }: ProfileEditDialogProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    avatar: user.avatar || "",
    interests: user.interests || [],
  })
  const [newInterest, setNewInterest] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && formData.interests.length < 10) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }))
  }

  const handleAvatarChange = (avatarUrl: string) => {
    setFormData((prev) => ({ ...prev, avatar: avatarUrl }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onSave(formData)
      onClose()
    } catch (error) {
      console.error("[v0] Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            <AvatarUpload
              currentAvatar={formData.avatar}
              userName={formData.name}
              onAvatarChange={handleAvatarChange}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="rounded-lg border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className="rounded-lg border-border resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="rounded-lg border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="rounded-lg border-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Interests</label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddInterest()
                    }
                  }}
                  placeholder="Add an interest..."
                  className="rounded-lg border-border"
                />
                <Button
                  onClick={handleAddInterest}
                  disabled={!newInterest.trim() || formData.interests.length >= 10}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
                >
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest: string, idx: number) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {interest}
                    <button
                      onClick={() => handleRemoveInterest(idx)}
                      className="hover:text-primary/70 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border hover:bg-muted rounded-lg bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
