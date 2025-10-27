"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Bell, Eye, Trash2, LogOut, AlertTriangle } from "lucide-react"

interface SettingsDialogProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
  onDeleteAccount: () => void
}

export function SettingsDialog({ isOpen, onClose, onLogout, onDeleteAccount }: SettingsDialogProps) {
  const [settings, setSettings] = useState({
    // Privacy Settings
    profileVisibility: "public",
    allowMessages: true,
    allowFriendRequests: true,
    showOnlineStatus: true,
    showLastSeen: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    likeNotifications: true,
    commentNotifications: true,
    friendRequestNotifications: true,
    messageNotifications: true,

    // Account Settings
    twoFactorAuth: false,
    activityStatus: true,
    dataCollection: true,
  })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("[v0] Settings saved:", settings)
      onClose()
    } catch (error) {
      console.error("[v0] Failed to save settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onDeleteAccount()
      onClose()
    } catch (error) {
      console.error("[v0] Failed to delete account:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings & Privacy</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Privacy Settings Tab */}
          <TabsContent value="privacy" className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Profile Visibility</h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Who can see your profile?</label>
                  <Select
                    value={settings.profileVisibility}
                    onValueChange={(v: string) => handleSettingChange("profileVisibility", v)}
                  >
                    <SelectTrigger className="rounded-lg border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Everyone</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Only Me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground text-sm">Allow Messages</p>
                    <p className="text-xs text-muted-foreground">Let others send you direct messages</p>
                  </div>
                  <Switch
                    checked={settings.allowMessages}
                    onCheckedChange={(v: boolean) => handleSettingChange("allowMessages", v)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground text-sm">Allow Friend Requests</p>
                    <p className="text-xs text-muted-foreground">Let others send you friend requests</p>
                  </div>
                  <Switch
                    checked={settings.allowFriendRequests}
                    onCheckedChange={(v: boolean) => handleSettingChange("allowFriendRequests", v)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground text-sm">Show Online Status</p>
                    <p className="text-xs text-muted-foreground">Let others see when you're online</p>
                  </div>
                  <Switch
                    checked={settings.showOnlineStatus}
                    onCheckedChange={(v: boolean) => handleSettingChange("showOnlineStatus", v)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground text-sm">Show Last Seen</p>
                    <p className="text-xs text-muted-foreground">Let others see when you were last active</p>
                  </div>
                  <Switch
                    checked={settings.showLastSeen}
                    onCheckedChange={(v: boolean) => handleSettingChange("showLastSeen", v)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Settings Tab */}
          <TabsContent value="notifications" className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Notification Preferences</h3>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground text-sm">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive email updates</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(v: boolean) => handleSettingChange("emailNotifications", v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground text-sm">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive browser notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(v: boolean) => handleSettingChange("pushNotifications", v)}
                />
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <h4 className="font-medium text-foreground text-sm mb-3">Notify me about:</h4>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-foreground">Likes on my posts</span>
                    <Switch
                      checked={settings.likeNotifications}
                      onCheckedChange={(v: boolean) => handleSettingChange("likeNotifications", v)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-foreground">Comments on my posts</span>
                    <Switch
                      checked={settings.commentNotifications}
                      onCheckedChange={(v: boolean) => handleSettingChange("commentNotifications", v)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-foreground">Friend requests</span>
                    <Switch
                      checked={settings.friendRequestNotifications}
                      onCheckedChange={(v: boolean) => handleSettingChange("friendRequestNotifications", v)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-foreground">New messages</span>
                    <Switch
                      checked={settings.messageNotifications}
                      onCheckedChange={(v: boolean) => handleSettingChange("messageNotifications", v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Account Settings Tab */}
          <TabsContent value="account" className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Account Security</h3>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(v: boolean) => handleSettingChange("twoFactorAuth", v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground text-sm">Activity Status</p>
                  <p className="text-xs text-muted-foreground">Show your activity on the platform</p>
                </div>
                <Switch
                  checked={settings.activityStatus}
                  onCheckedChange={(v: boolean) => handleSettingChange("activityStatus", v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground text-sm">Data Collection</p>
                  <p className="text-xs text-muted-foreground">Allow us to improve your experience</p>
                </div>
                <Switch
                  checked={settings.dataCollection}
                  onCheckedChange={(v: boolean) => handleSettingChange("dataCollection", v)}
                />
              </div>

              <div className="border-t border-border pt-4 mt-4 space-y-3">
                <h4 className="font-medium text-foreground text-sm">Danger Zone</h4>

                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full border-border hover:bg-muted rounded-lg font-medium bg-transparent flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>

                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {showDeleteConfirm && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <p className="font-semibold mb-2">Are you sure you want to delete your account?</p>
              <p className="text-sm mb-3">This action cannot be undone. All your data will be permanently deleted.</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  size="sm"
                  className="border-red-200 hover:bg-red-100 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  disabled={isSaving}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isSaving ? "Deleting..." : "Delete Account"}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border hover:bg-muted rounded-lg bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
