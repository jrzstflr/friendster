"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Home, User, Users, MessageSquare, Settings, LogOut, Sparkles, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Sidebar({ currentUser, activeTab, setActiveTab, onLogout, friendRequestCount }: any) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "friends", label: "Friends", icon: Users, badge: friendRequestCount > 0 ? friendRequestCount : null },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setIsOpen(false)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
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
              onClick={() => handleTabChange(item.id)}
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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:bg-card lg:shadow-lg lg:border-r lg:border-border lg:p-6 lg:overflow-y-auto lg:flex lg:flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Friendster</h1>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
