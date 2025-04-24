"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { BlogEditor } from "@/components/blog/blog-editor"
import { getBlogPosts, type BlogPost } from "@/lib/blog-actions"

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const posts = await getBlogPosts()
        const foundPost = posts.find((p) => p.id === params.id)

        if (foundPost) {
          setPost(foundPost)
        } else {
          toast({
            title: "Post not found",
            description: "The blog post you're trying to edit could not be found.",
            variant: "destructive",
          })
          router.push("/admin/blog")
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error)
        toast({
          title: "Error",
          description: "Failed to load blog post. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/blog")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id, router, toast])

  if (!user || !["admin", "superadmin"].includes(user.role || "")) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Blog Post</h2>
        <p className="text-muted-foreground">Update and republish your blog post</p>
      </div>

      <BlogEditor post={post} userId={user.id} />
    </div>
  )
}
