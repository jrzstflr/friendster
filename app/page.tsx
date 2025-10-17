"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null)

  if (!currentUser) {
    return <LoginForm onLogin={setCurrentUser} />
  }

  return <Dashboard currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
}
