"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Heart, MessageCircle, Users, X, CheckCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Notification {
  id: string
  type: "like" | "comment" | "friend" | "reaction" | "reply"
  user: { name: string; avatar: string; id: string }
  message: string
  postId?: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export function NotificationsPanel({ isOpen, onClose, notifications: externalNotifications }: any) {
  const [notifications, setNotifications] = useState<Notification[]>(
    externalNotifications || [
      {
        id: "1",
        type: "like",
        user: { name: "Sarah Johnson", avatar: "/placeholder.svg", id: "user1" },
        message: "liked your post",
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
      },
      {
        id: "2",
        type: "comment",
        user: { name: "Mike Chen", avatar: "/placeholder.svg", id: "user2" },
        message: "commented on your post",
        timestamp: new Date(Date.now() - 15 * 60000),
        read: false,
      },
      {
        id: "3",
        type: "reaction",
        user: { name: "Emma Davis", avatar: "/placeholder.svg", id: "user3" },
        message: "reacted with ❤️ to your post",
        timestamp: new Date(Date.now() - 1 * 3600000),
        read: false,
      },
      {
        id: "4",
        type: "friend",
        user: { name: "John Smith", avatar: "/placeholder.svg", id: "user4" },
        message: "sent you a friend request",
        timestamp: new Date(Date.now() - 2 * 3600000),
        read: true,
      },
    ],
  )

  const [filter, setFilter] = useState<"all" | "unread">("all")

  useEffect(() => {
    if (externalNotifications) {
      setNotifications(externalNotifications)
    }
  }, [externalNotifications])

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "reply":
        return <MessageCircle className="h-4 w-4 text-blue-400" />
      case "reaction":
        return <Heart className="h-4 w-4 text-pink-500" />
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
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-screen w-96 bg-card shadow-2xl border-l border-border overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="ml-auto bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {notifications.length > 0 && (
          <div className="border-b border-border p-2 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex-1 text-xs h-8 rounded-lg"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="flex-1 text-xs h-8 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          </div>
        )}

        {notifications.length > 0 && (
          <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="w-full rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Unread
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
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
                      className={`p-4 hover:bg-muted transition-smooth cursor-pointer group ${!notif.read ? "bg-primary/5" : ""}`}
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
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="unread" className="mt-0">
              <div className="divide-y divide-border">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <CheckCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">All caught up!</p>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-muted transition-smooth cursor-pointer group bg-primary/5"
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
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {notifications.length === 0 && (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
