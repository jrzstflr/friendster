"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Feed } from "@/components/feed"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { FriendsPage } from "@/components/friends-page"
import { MessagesPage } from "@/components/messages-page"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { NotificationBell } from "@/components/notification-bell"

export function Dashboard({ currentUser, onLogout }: { currentUser: any; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("feed")
  const [users, setUsers] = useState<any[]>(() => {
    const stored = localStorage.getItem("users")
    return stored ? JSON.parse(stored) : []
  })
  const [friendRequests, setFriendRequests] = useState<any[]>(() => {
    const stored = localStorage.getItem("friendRequests")
    return stored ? JSON.parse(stored) : []
  })

  const handleAcceptFriendRequest = (requestId: string) => {
    const request = friendRequests.find((r) => r.id === requestId)
    if (request) {
      const updatedUsers = users.map((u) => {
        if (u.id === currentUser.id) {
          return { ...u, friends: [...(u.friends || []), request.fromId] }
        }
        if (u.id === request.fromId) {
          return { ...u, friends: [...(u.friends || []), currentUser.id] }
        }
        return u
      })
      setUsers(updatedUsers)
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      const updated = friendRequests.filter((r) => r.id !== requestId)
      setFriendRequests(updated)
      localStorage.setItem("friendRequests", JSON.stringify(updated))
    }
  }

  const handleRejectFriendRequest = (requestId: string) => {
    const updated = friendRequests.filter((r) => r.id !== requestId)
    setFriendRequests(updated)
    localStorage.setItem("friendRequests", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
          friendRequestCount={friendRequests.filter((r) => r.toId === currentUser.id).length}
        />

        <div className="flex-1 ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground capitalize">{activeTab}</h1>
              <NotificationBell unreadCount={3} />
            </div>

            {activeTab === "feed" && <Feed currentUser={currentUser} />}
            {activeTab === "profile" && <ProfileSidebar user={currentUser} />}
            {activeTab === "friends" && (
              <FriendsPage
                currentUser={currentUser}
                users={users}
                friendRequests={friendRequests}
                onAcceptRequest={handleAcceptFriendRequest}
                onRejectRequest={handleRejectFriendRequest}
                setFriendRequests={setFriendRequests}
              />
            )}
            {activeTab === "messages" && <MessagesPage currentUser={currentUser} />}
          </div>
        </div>

        <TrendingSidebar />
      </div>
    </div>
  )
}
