"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function MessagesPage({ currentUser }: any) {
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load conversations from localStorage
    const stored = localStorage.getItem("conversations")
    if (stored) {
      setConversations(JSON.parse(stored))
    }

    // Load users
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConversation, conversations])

  const currentUserData = users.find((u) => u.id === currentUser.id)
  const myFriends = currentUserData?.friends || []

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    const conversationId = selectedConversation
    const newMessage = {
      id: Date.now().toString(),
      conversationId,
      senderId: currentUser.id,
      text: messageText,
      timestamp: new Date().toISOString(),
    }

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...(conv.messages || []), newMessage],
          lastMessage: messageText,
          lastMessageTime: new Date().toISOString(),
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    localStorage.setItem("conversations", JSON.stringify(updatedConversations))
    setMessageText("")
  }

  const handleStartConversation = (friendId: string) => {
    const conversationId = [currentUser.id, friendId].sort().join("-")
    const existingConv = conversations.find((c) => c.id === conversationId)

    if (!existingConv) {
      const newConversation = {
        id: conversationId,
        participants: [currentUser.id, friendId],
        messages: [],
        createdAt: new Date().toISOString(),
      }
      const updated = [...conversations, newConversation]
      setConversations(updated)
      localStorage.setItem("conversations", JSON.stringify(updated))
    }

    setSelectedConversation(conversationId)
  }

  const selectedConv = conversations.find((c) => c.id === selectedConversation)
  const otherParticipantId = selectedConv?.participants.find((p: string) => p !== currentUser.id)
  const otherParticipant = users.find((u) => u.id === otherParticipantId)

  const userConversations = conversations.filter((c) => c.participants.includes(currentUser.id))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <Card className="bg-white rounded-3xl shadow-lg p-4 border-0 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>

        {userConversations.length === 0 ? (
          <div className="space-y-2">
            <p className="text-gray-500 text-sm mb-4">No conversations yet. Start one with a friend!</p>
            {myFriends.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600">Friends:</p>
                {myFriends.map((friendId: string) => {
                  const friend = users.find((u) => u.id === friendId)
                  return (
                    <button
                      key={friendId}
                      onClick={() => handleStartConversation(friendId)}
                      className="w-full text-left p-3 rounded-xl hover:bg-orange-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-orange-300">
                          <AvatarImage src={friend?.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{friend?.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-700">{friend?.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {userConversations.map((conv) => {
              const otherUserId = conv.participants.find((p: string) => p !== currentUser.id)
              const otherUser = users.find((u) => u.id === otherUserId)
              const isSelected = conv.id === selectedConversation

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    isSelected ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white" : "hover:bg-orange-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className={`h-8 w-8 border ${isSelected ? "border-white" : "border-orange-300"}`}>
                      <AvatarImage src={otherUser?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{otherUser?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isSelected ? "text-white" : "text-gray-800"}`}>
                        {otherUser?.name}
                      </p>
                      <p className={`text-xs truncate ${isSelected ? "text-orange-100" : "text-gray-600"}`}>
                        {conv.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Add more friends */}
            {myFriends.length > userConversations.length && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">Start new chat:</p>
                {myFriends
                  .filter((friendId: string) => !userConversations.some((c) => c.participants.includes(friendId)))
                  .map((friendId: string) => {
                    const friend = users.find((u) => u.id === friendId)
                    return (
                      <button
                        key={friendId}
                        onClick={() => handleStartConversation(friendId)}
                        className="w-full text-left p-2 rounded-lg hover:bg-orange-100 transition-colors text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 border border-orange-300">
                            <AvatarImage src={friend?.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{friend?.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-gray-700">{friend?.name}</span>
                        </div>
                      </button>
                    )
                  })}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Chat Area */}
      {selectedConversation && selectedConv ? (
        <Card className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-0 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white p-4 flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={otherParticipant?.avatar || "/placeholder.svg"} />
              <AvatarFallback>{otherParticipant?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{otherParticipant?.name}</p>
              <p className="text-xs opacity-90">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConv.messages && selectedConv.messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              selectedConv.messages?.map((msg: any) => {
                const isOwn = msg.senderId === currentUser.id
                return (
                  <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        isOwn
                          ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${isOwn ? "text-orange-100" : "text-gray-600"}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4 flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="rounded-xl border-gray-300"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl font-bold px-6"
            >
              Send
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-0 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Select a conversation to start chatting</p>
        </Card>
      )}
    </div>
  )
}
