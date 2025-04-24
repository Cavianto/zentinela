import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Shield } from "lucide-react"
import { getBlogPosts } from "@/lib/blog-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogHeader } from "@/components/blog/blog-header"

// Add error handling to the page component
export const dynamic = "force-dynamic"

export default async function BlogPage() {
  let posts = []

  try {
    posts = await getBlogPosts()
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    // Continue with empty posts array
    posts = []
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Zentinela Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights and expertise on cybersecurity, OSINT, and digital risk management
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.featured_image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{format(new Date(post.published_at), "MMMM d, yyyy")}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {post.author_name ? post.author_name.charAt(0) : "?"}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.author_name || "Unknown Author"}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>Read more</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
            <p className="text-muted-foreground">Check back soon for new content!</p>
          </div>
        )}
      </main>
    </div>
  )
}
