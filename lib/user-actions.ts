"use server"

import type { User } from "./auth-provider"

// Mock users database
const MOCK_USERS: User[] = [
  {
    id: "user_123",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (555) 123-4567",
    plan: "professional",
    role: "user",
  },
  {
    id: "user_456",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1 (555) 987-6543",
    plan: "basic",
    role: "user",
  },
  {
    id: "user_789",
    email: "bob@example.com",
    firstName: "Bob",
    lastName: "Johnson",
    phone: "+1 (555) 456-7890",
    plan: "enterprise",
    role: "user",
  },
  {
    id: "admin_123",
    email: "admin@zentinela.com",
    firstName: "Admin",
    lastName: "User",
    phone: "+1 (555) 111-2222",
    role: "superadmin",
  },
]

export async function getAllUsers(): Promise<User[]> {
  // In a real app, this would fetch users from your database
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return MOCK_USERS
}

export async function getUserById(userId: string): Promise<User | null> {
  // In a real app, this would fetch a user from your database
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const user = MOCK_USERS.find((user) => user.id === userId)
  return user || null
}

export type { User }
