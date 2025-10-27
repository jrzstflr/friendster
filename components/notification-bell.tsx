"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { NotificationsPanel, type Notification } from "@/components/notifications-panel"

interface NotificationBellProps {
  unreadCount?: number
  notifications?: Notification[]
  onNotificationClick?: (notification: Notification) => void
}

export function NotificationBell({ unreadCount = 0, notifications = [], onNotificationClick }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(unreadCount)

  useEffect(() => {
    setDisplayCount(unreadCount)
  }, [unreadCount])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-muted-foreground hover:text-foreground transition-all duration-300"
      >
        <Bell className={`h-5 w-5 ${displayCount > 0 ? "animate-bounce" : ""}`} />
        {displayCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {displayCount > 9 ? "9+" : displayCount}
          </span>
        )}
      </Button>
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} notifications={notifications} />
    </>
  )
}
