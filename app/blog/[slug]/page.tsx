import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ChevronLeft } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/blog-service"
import { Button } from "@/components/ui/button"
import { BlogHeader } from "@/components/blog/blog-header"
import { Markdown } from "@/components/blog/markdown"

export const dynamic = "force-dynamic"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post = null

  try {
    post = await getBlogPostBySlug(params.slug)
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
    // Instead of immediately calling notFound(), we'll check post after the catch block
  }

  // If post is still null after the try-catch, then call notFound()
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container py-12">
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/blog" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Button>

          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {post.author_name ? post.author_name.charAt(0) : "?"}
                </span>
              </div>
              <span>{post.author_name || "Unknown Author"}</span>
            </div>
            <div className="text-sm">{format(new Date(post.published_at), "MMMM d, yyyy")}</div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.featured_image && (
            <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featured_image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Markdown content={post.content} />
          </div>
        </div>
      </main>
    </div>
  )
}
