"use server"

import { cookies } from "next/headers"
// Remove the redirect import since we'll handle redirection differently
// import { redirect } from "next/navigation"
import type { User } from "./auth-provider"

// In a real app, these functions would interact with your authentication system
// such as NextAuth.js, Clerk, or a custom solution with a database

type SignUpParams = {
  email: string
  password: string
  firstName: string
  lastName: string
  plan?: string
}

type SignInParams = {
  email: string
  password: string
}

type ChangePasswordParams = {
  currentPassword: string
  newPassword: string
}

type UpdateProfileParams = {
  firstName: string
  lastName: string
  email: string
  phone?: string
}

// Update the MOCK_USER to include a role
const MOCK_USER: User = {
  id: "user_123",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1 (555) 123-4567",
  plan: "professional",
  role: "user",
}

// Add a mock admin user
const MOCK_ADMIN: User = {
  id: "admin_123",
  email: "admin@sentinela.com",
  firstName: "Admin",
  lastName: "User",
  phone: "+1 (555) 987-6543",
  role: "superadmin",
}

export async function signUp(params: SignUpParams): Promise<User> {
  // In a real app, this would create a new user in your database
  // and set up authentication cookies/tokens

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user: User = {
    id: "user_" + Math.random().toString(36).substring(2, 9),
    email: params.email,
    firstName: params.firstName,
    lastName: params.lastName,
    plan: params.plan,
  }

  // Set a cookie to simulate authentication
  cookies().set("auth_token", "mock_token_" + user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return user
}

// Update the signIn function to properly handle authentication and return user data

export async function signIn(params: SignInParams): Promise<User> {
  // In a real app, this would validate credentials against your database
  // and set up authentication cookies/tokens

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demonstration purposes, accept any email/password combination
  // This ensures the login will work regardless of input
  const mockUser: User = {
    id: "user_" + Math.random().toString(36).substring(2, 9),
    email: params.email,
    firstName: params.email.split("@")[0], // Use part of email as first name
    lastName: "User",
    phone: "+1 (555) 123-4567",
    plan: "professional",
    role: params.email.includes("admin") ? "superadmin" : "user",
  }

  // Set a cookie to simulate authentication
  cookies().set("auth_token", "mock_token_" + mockUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return mockUser
}

// Update the signOut function to use "zentinela_user" instead of "sentinela_user"
export async function signOut(): Promise<{ success: boolean }> {
  // In a real app, this would clear authentication cookies/tokens

  // Clear the authentication cookie
  cookies().delete("auth_token")

  // Return success instead of redirecting
  return { success: true }
}

export async function changePassword(params: ChangePasswordParams): Promise<void> {
  // In a real app, this would validate the current password
  // and update the password in your database

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate validation
  if (params.currentPassword !== "password") {
    throw new Error("Current password is incorrect")
  }

  // Password updated successfully
  return
}

export async function updateUserProfile(params: UpdateProfileParams): Promise<User> {
  // In a real app, this would update the user profile in your database

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Update the user object
  const updatedUser: User = {
    ...MOCK_USER,
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    phone: params.phone,
  }

  return updatedUser
}
