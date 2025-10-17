"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function FriendsPage({
  currentUser,
  users,
  friendRequests,
  onAcceptRequest,
  onRejectRequest,
  setFriendRequests,
}: any) {
  const [searchQuery, setSearchQuery] = useState("")

  const currentUserData = users.find((u: any) => u.id === currentUser.id)
  const myFriends = currentUserData?.friends || []

  const incomingRequests = friendRequests.filter((r: any) => r.toId === currentUser.id)
  const outgoingRequests = friendRequests.filter((r: any) => r.fromId === currentUser.id)

  const filteredUsers = users.filter(
    (u: any) =>
      u.id !== currentUser.id &&
      !myFriends.includes(u.id) &&
      !outgoingRequests.some((r: any) => r.toId === u.id) &&
      !incomingRequests.some((r: any) => r.fromId === u.id) &&
      u.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendFriendRequest = (toUserId: string) => {
    const newRequest = {
      id: Date.now().toString(),
      fromId: currentUser.id,
      toId: toUserId,
      timestamp: new Date().toISOString(),
    }
    const updated = [...friendRequests, newRequest]
    setFriendRequests(updated)
    localStorage.setItem("friendRequests", JSON.stringify(updated))
  }

  return (
    <div className="space-y-6">
      {/* Incoming Requests */}
      {incomingRequests.length > 0 && (
        <Card className="bg-white rounded-3xl shadow-lg p-6 border-0 border-l-4 border-orange-400">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Friend Requests</h2>
          <div className="space-y-3">
            {incomingRequests.map((request: any) => {
              const requester = users.find((u: any) => u.id === request.fromId)
              return (
                <div key={request.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-orange-400">
                      <AvatarImage src={requester?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{requester?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-800">{requester?.name}</p>
                      <p className="text-xs text-gray-600">{requester?.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onAcceptRequest(request.id)}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => onRejectRequest(request.id)}
                      variant="outline"
                      className="rounded-lg text-sm"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* My Friends */}
      <Card className="bg-white rounded-3xl shadow-lg p-6 border-0 border-l-4 border-pink-400">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Friends ({myFriends.length})</h2>
        {myFriends.length === 0 ? (
          <p className="text-gray-500">No friends yet. Send friend requests to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {myFriends.map((friendId: string) => {
              const friend = users.find((u: any) => u.id === friendId)
              return (
                <div key={friendId} className="flex items-center gap-3 p-4 bg-pink-50 rounded-2xl">
                  <Avatar className="h-12 w-12 border-2 border-pink-400">
                    <AvatarImage src={friend?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{friend?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{friend?.name}</p>
                    <p className="text-xs text-gray-600">{friend?.email}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {/* Find Friends */}
      <Card className="bg-white rounded-3xl shadow-lg p-6 border-0 border-l-4 border-rose-400">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Friends</h2>

        <Input
          type="text"
          placeholder="Search for friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 rounded-xl border-gray-300"
        />

        {filteredUsers.length === 0 ? (
          <p className="text-gray-500">No users found or already connected.</p>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-rose-400">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleSendFriendRequest(user.id)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg text-sm"
                >
                  Add Friend
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
