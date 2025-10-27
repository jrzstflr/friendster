"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, LinkIcon, Calendar, Edit2, Settings } from "lucide-react"
import { ProfileEditDialog } from "@/components/profile-edit-dialog"
import { SettingsDialog } from "@/components/settings-dialog"

export function ProfileSidebar({
  user,
  onUserUpdate,
  onLogout,
  onDeleteAccount,
}: {
  user: any
  onUserUpdate?: (user: any) => void
  onLogout?: () => void
  onDeleteAccount?: () => void
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)

  const handleSaveProfile = (updatedUser: any) => {
    setCurrentUser(updatedUser)
    if (onUserUpdate) {
      onUserUpdate(updatedUser)
    }
  }

  const postCount = 0
  const friendCount = currentUser.friends?.length || 0
  const likeCount = 0

  return (
    <div className="space-y-6">
      <Card className="bg-card rounded-2xl shadow-md overflow-hidden border border-border">
        <div className="h-40 bg-gradient-to-r from-primary via-accent to-secondary" />

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-20 mb-4">
            <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          <h1 className="text-3xl font-bold text-foreground">{currentUser.name}</h1>
          <p className="text-muted-foreground mb-4 font-medium">@{currentUser.email?.split("@")[0] || "user"}</p>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
            {currentUser.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {currentUser.location}
              </div>
            )}
            {currentUser.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Website
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined recently
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium shadow-md transition-all duration-300 ease-out flex items-center justify-center gap-2"
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              onClick={() => setIsSettingsOpen(true)}
              variant="outline"
              className="flex-1 rounded-lg border-border hover:bg-muted font-medium transition-all duration-300 ease-out bg-transparent flex items-center justify-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{friendCount}</p>
              <p className="text-xs text-muted-foreground font-medium">Friends</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{postCount}</p>
              <p className="text-xs text-muted-foreground font-medium">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{likeCount}</p>
              <p className="text-xs text-muted-foreground font-medium">Likes</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-card rounded-2xl shadow-md p-6 border border-border">
        <h2 className="font-bold text-lg text-foreground mb-3">About</h2>
        <p className="text-foreground leading-relaxed">
          {currentUser.bio || "No bio yet. Add one to tell friends about yourself!"}
        </p>
      </Card>

      <Card className="bg-card rounded-2xl shadow-md p-6 border border-border">
        <h2 className="font-bold text-lg text-foreground mb-3">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests && currentUser.interests.length > 0 ? (
            currentUser.interests.map((interest: string, idx: number) => (
              <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {interest}
              </span>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No interests added yet.</p>
          )}
        </div>
      </Card>

      <Card className="bg-card rounded-2xl shadow-md p-6 border border-border">
        <h2 className="font-bold text-lg text-foreground mb-3">Recent Activity</h2>
        <p className="text-muted-foreground text-sm">No recent activity yet. Start sharing to get started!</p>
      </Card>

      <ProfileEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        user={currentUser}
        onSave={handleSaveProfile}
      />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onLogout={onLogout || (() => {})}
        onDeleteAccount={onDeleteAccount || (() => {})}
      />
    </div>
  )
}
