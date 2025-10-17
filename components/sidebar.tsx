"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Sidebar({ currentUser, activeTab, setActiveTab, onLogout, friendRequestCount }: any) {
  const menuItems = [
    { id: "feed", label: "Feed", icon: "📰" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "friends", label: "Friends", icon: "👥", badge: friendRequestCount > 0 ? friendRequestCount : null },
    { id: "messages", label: "Messages", icon: "💬" },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-2xl border-r-4 border-orange-400 p-6 overflow-y-auto">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
          Friendster
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-medium">Social Network</p>
      </div>

      {/* User Card */}
      <Card className="bg-gradient-to-br from-orange-100 to-pink-100 border-0 rounded-2xl p-4 mb-8 shadow-md border-l-4 border-orange-400">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-12 w-12 border-2 border-orange-400 flex-shrink-0">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-gray-800">{currentUser.name}</p>
            <p className="text-xs text-gray-600">{currentUser.email}</p>
          </div>
        </div>
      </Card>

      {/* Menu */}
      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all relative group ${
              activeTab === item.id
                ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg"
                : "text-gray-700 hover:bg-orange-100"
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <Button
        onClick={onLogout}
        className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
      >
        Logout
      </Button>
    </div>
  )
}
