"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Feed } from "@/components/feed"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { FriendsPage } from "@/components/friends-page"
import { MessagesPage } from "@/components/messages-page"

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
      // Add to friends list
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

      // Remove request
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50">
      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
          friendRequestCount={friendRequests.filter((r) => r.toId === currentUser.id).length}
        />

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6">
          <div className="max-w-4xl mx-auto">
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

        {/* Right Sidebar - Friends */}
        <div className="w-64 p-6 hidden lg:block">
          <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-orange-400">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Friends</h3>
            {users.find((u) => u.id === currentUser.id)?.friends?.length > 0 ? (
              <div className="space-y-2">
                {users
                  .find((u) => u.id === currentUser.id)
                  ?.friends?.map((friendId: string) => {
                    const friend = users.find((u) => u.id === friendId)
                    return (
                      <div key={friendId} className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-50">
                        <img
                          src={friend?.avatar || "/placeholder.svg"}
                          alt={friend?.name}
                          className="w-8 h-8 rounded-full border border-orange-300"
                        />
                        <span className="text-sm font-medium text-gray-700">{friend?.name}</span>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No friends yet. Add some!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
