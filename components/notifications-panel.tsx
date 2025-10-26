"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Heart, MessageCircle, Users, X } from "lucide-react"

export function NotificationsPanel({ isOpen, onClose }: any) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "like",
      user: { name: "Sarah Johnson", avatar: "/placeholder.svg" },
      message: "liked your post",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
    {
      id: "2",
      type: "comment",
      user: { name: "Mike Chen", avatar: "/placeholder.svg" },
      message: "commented on your post",
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
    },
    {
      id: "3",
      type: "friend",
      user: { name: "Emma Davis", avatar: "/placeholder.svg" },
      message: "sent you a friend request",
      timestamp: new Date(Date.now() - 1 * 3600000),
      read: true,
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-secondary" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-accent" />
      case "friend":
        return <Users className="h-4 w-4 text-primary" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const formatTime = (date: Date) => {
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

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-screen w-96 bg-card shadow-2xl border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-foreground">Notifications</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="divide-y divide-border">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 hover:bg-muted transition-smooth cursor-pointer ${!notif.read ? "bg-primary/5" : ""}`}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 border border-border flex-shrink-0">
                    <AvatarImage src={notif.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{notif.user.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          <span className="font-bold">{notif.user.name}</span> {notif.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{formatTime(notif.timestamp)}</p>
                      </div>
                      {getIcon(notif.type)}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notif.id)
                    }}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
