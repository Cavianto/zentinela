"use client"

import { useAuth } from "@/lib/auth-provider"
import { BlogEditor } from "@/components/blog/blog-editor"

export default function NewBlogPostPage() {
  const { user } = useAuth()

  if (!user || !["admin", "superadmin"].includes(user.role || "")) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Blog Post</h2>
        <p className="text-muted-foreground">Create and publish a new blog post</p>
      </div>

      <BlogEditor userId={user.id} />
    </div>
  )
}
