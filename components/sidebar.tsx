"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Home, User, Users, MessageSquare, Settings, LogOut, Sparkles } from "lucide-react"

export function Sidebar({ currentUser, activeTab, setActiveTab, onLogout, friendRequestCount }: any) {
  const menuItems = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "friends", label: "Friends", icon: Users, badge: friendRequestCount > 0 ? friendRequestCount : null },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card shadow-lg border-r border-border p-6 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Friendster</h1>
        </div>
        <p className="text-xs text-muted-foreground font-medium">Social Network</p>
      </div>

      <Card className="bg-muted rounded-xl border border-border p-4 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-12 w-12 border-2 border-primary flex-shrink-0">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-bold text-foreground text-sm truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
          </div>
        </div>
      </Card>

      <nav className="space-y-1 mb-8 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-3 relative group ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="space-y-2 border-t border-border pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg font-medium transition-all duration-300 ease-out"
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Button>
        <Button
          onClick={onLogout}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-medium shadow-md transition-all duration-300 ease-out justify-start"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
