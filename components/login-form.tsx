"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function LoginForm({ onLogin }: { onLogin: (user: any) => void }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isSignUp && !name) {
      alert("Please enter your name")
      return
    }

    // Create user object with local storage
    const user = {
      id: Date.now().toString(),
      email,
      name: isSignUp ? name : email.split("@")[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      bio: "",
      friends: [],
      createdAt: new Date().toISOString(),
    }

    // Store user in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (isSignUp) {
      users.push(user)
      localStorage.setItem("users", JSON.stringify(users))
    } else {
      const foundUser = users.find((u: any) => u.email === email && u.id)
      if (!foundUser) {
        alert("User not found. Please sign up first.")
        return
      }
      onLogin(foundUser)
      return
    }

    onLogin(user)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-orange-600 mb-2">Friendster</h1>
          <p className="text-gray-600">Connect with friends the retro way</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-pink-400 h-2" />

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{isSignUp ? "Create Account" : "Welcome Back"}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-gray-300"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </p>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </Card>

        {/* Demo Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo: Use any email to sign up or log in</p>
        </div>
      </div>
    </div>
  )
}
