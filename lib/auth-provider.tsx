"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  plan?: string
  role?: "user" | "admin" | "superadmin"
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        // In a real app, this would check for a session cookie or token
        // and fetch the user data from your backend
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("zentinela_user")
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser)
              setUser(parsedUser)
            } catch (parseError) {
              console.error("Failed to parse user data:", parseError)
              localStorage.removeItem("zentinela_user") // Remove invalid data
            }
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  return <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
