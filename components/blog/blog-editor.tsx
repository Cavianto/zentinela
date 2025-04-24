"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Markdown } from "@/components/blog/markdown"
import { createBlogPost, updateBlogPost, type BlogPostWithAuthor } from "@/lib/blog-service"

interface BlogEditorProps {
  post?: BlogPostWithAuthor
  userId: string
}

export function BlogEditor({ post, userId }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "")
  const [tags, setTags] = useState(post?.tags ? post.tags.join(", ") : "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("write")
  const router = useRouter()
  const { toast } = useToast()
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Adjust textarea height based on content
  useEffect(() => {
    if (contentTextareaRef.current) {
      contentTextareaRef.current.style.height = "auto"
      contentTextareaRef.current.style.height = `${contentTextareaRef.current.scrollHeight}px`
    }
  }, [content])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const processedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      if (post) {
        // Update existing post
        await updateBlogPost(post.id, {
          title,
          content,
          excerpt: excerpt || null,
          featured_image: featuredImage || null,
          tags: processedTags,
        })

        toast({
          title: "Post updated",
          description: "Your blog post has been successfully updated.",
        })
      } else {
        // Create new post
        await createBlogPost(userId, {
          title,
          content,
          excerpt: excerpt || undefined,
          featured_image: featuredImage || undefined,
          tags: processedTags,
        })

        toast({
          title: "Post created",
          description: "Your blog post has been successfully published.",
        })
      }

      // Add timestamp to force a refresh of the blog page
      router.push(`/admin/blog?t=${Date.now()}`)
    } catch (error) {
      console.error("Failed to save blog post:", error)
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary of the post (displayed in previews)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="featuredImage">Featured Image URL</Label>
          <Input
            id="featuredImage"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-muted-foreground">
            Enter a URL for the featured image. For production use, you would upload images to a storage service.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="cybersecurity, OSINT, privacy (comma separated)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">
            Content <span className="text-destructive">*</span>
          </Label>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-0">
              <Textarea
                ref={contentTextareaRef}
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content in Markdown..."
                className="min-h-[400px] font-mono"
                required
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <Card>
                <CardContent className="p-4">
                  {content ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <Markdown content={content} />
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">Nothing to preview yet...</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <p className="text-xs text-muted-foreground">Content supports Markdown formatting for rich text.</p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  )
}
