import Link from "next/link"
import { format } from "date-fns"
import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPopularBlogPosts } from "@/lib/blog-service"

export async function PopularBlogPosts() {
  const posts = await getPopularBlogPosts(3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Popular Blog Posts
        </CardTitle>
        <CardDescription>Most viewed articles on our blog</CardDescription>
      </CardHeader>
      <CardContent>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start gap-4 pb-4 last:pb-0 last:border-0 border-b">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Link href={`/blog/${post.slug}`} className="font-medium hover:underline">
                    {post.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{format(new Date(post.published_at), "MMMM d, yyyy")}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No blog posts available yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
