"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function ProfileSidebar({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-white rounded-3xl shadow-lg overflow-hidden border-0">
        <div className="h-40 bg-gradient-to-r from-orange-400 via-pink-400 to-rose-400" />

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-20 mb-4">
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          <h1 className="text-4xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600 mb-4 font-medium">{user.email}</p>

          <div className="flex gap-2 mb-6">
            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl font-bold shadow-lg">
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl bg-transparent border-2 border-gray-300 hover:bg-gray-100 font-bold"
            >
              Settings
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                0
              </p>
              <p className="text-xs text-gray-600 font-medium">Friends</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                0
              </p>
              <p className="text-xs text-gray-600 font-medium">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                0
              </p>
              <p className="text-xs text-gray-600 font-medium">Likes</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Bio Section */}
      <Card className="bg-white rounded-3xl shadow-lg p-6 border-0 border-l-4 border-pink-400">
        <h2 className="font-bold text-lg text-gray-800 mb-3">About</h2>
        <p className="text-gray-600 leading-relaxed">
          {user.bio || "No bio yet. Add one to tell friends about yourself!"}
        </p>
      </Card>

      {/* Activity Section */}
      <Card className="bg-white rounded-3xl shadow-lg p-6 border-0 border-l-4 border-rose-400">
        <h2 className="font-bold text-lg text-gray-800 mb-3">Recent Activity</h2>
        <p className="text-gray-600 text-sm">No recent activity yet.</p>
      </Card>
    </div>
  )
}
