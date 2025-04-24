import { executeQuery } from "./db"
import { getBlogPosts as getFallbackBlogPosts } from "./blog-actions"

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  author_id: string | null
  published_at: Date
  updated_at: Date
  tags: string[]
}

export type BlogPostWithAuthor = BlogPost & {
  author_name: string
  author_email: string
}

export type BlogPostView = {
  id: string
  post_id: string
  view_count: number
  last_viewed_at: Date
}

async function handleDatabaseError<T>(operation: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    console.error("Database operation failed, using fallback:", error)
    try {
      return await fallback()
    } catch (fallbackError) {
      console.error("Fallback operation also failed:", fallbackError)
      // Return a safe default value based on the expected return type
      // This is to prevent build failures
      return [] as unknown as T
    }
  }
}

export async function getBlogPosts(): Promise<BlogPostWithAuthor[]> {
  return handleDatabaseError(
    async () => {
      const query = `
        SELECT 
          bp.*,
          u.first_name || ' ' || u.last_name as author_name,
          u.email as author_email
        FROM 
          blog_posts bp
        LEFT JOIN 
          users u ON bp.author_id = u.id
        ORDER BY 
          bp.published_at DESC
      `

      return executeQuery<BlogPostWithAuthor>(query)
    },
    async () => {
      // Convert the format from blog-actions to match blog-service
      const fallbackPosts = await getFallbackBlogPosts()
      return fallbackPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content: post.content,
        featured_image: post.featuredImage || null,
        author_id: post.author.id,
        published_at: new Date(post.publishedAt),
        updated_at: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
        tags: post.tags || [],
        author_name: post.author.name,
        author_email: "",
      }))
    },
  )
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithAuthor | null> {
  return handleDatabaseError(
    async () => {
      const query = `
        SELECT 
          bp.*,
          u.first_name || ' ' || u.last_name as author_name,
          u.email as author_email
        FROM 
          blog_posts bp
        LEFT JOIN 
          users u ON bp.author_id = u.id
        WHERE 
          bp.slug = $1
      `

      const posts = await executeQuery<BlogPostWithAuthor>(query, [slug])

      if (posts.length === 0) {
        return null
      }

      // Increment view count
      try {
        await incrementPostViewCount(posts[0].id)
      } catch (error) {
        console.error("Failed to increment view count:", error)
      }

      return posts[0]
    },
    async () => {
      // Use the fallback from blog-actions
      const post = await getBlogPostBySlug(slug)
      if (!post) {
        return null
      }

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content: post.content,
        featured_image: post.featured_image || null,
        author_id: post.author_id,
        published_at: post.published_at,
        updated_at: post.updated_at,
        tags: post.tags,
        author_name: post.author_name,
        author_email: post.author_email,
      }
    },
  )
}

export async function createBlogPost(
  authorId: string,
  postData: {
    title: string
    content: string
    excerpt?: string
    featured_image?: string
    tags?: string[]
  },
): Promise<BlogPost> {
  // Generate a slug from the title
  const slug = postData.title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")

  const query = `
    INSERT INTO blog_posts (
      title, 
      slug, 
      excerpt, 
      content, 
      featured_image, 
      author_id, 
      tags
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7
    )
    RETURNING *
  `

  const params = [
    postData.title,
    slug,
    postData.excerpt || null,
    postData.content,
    postData.featured_image || null,
    authorId,
    postData.tags || [],
  ]

  const posts = await executeQuery<BlogPost>(query, params)

  // Note: In app directory, we would use revalidatePath here
  // For pages directory compatibility, we're removing revalidatePath calls

  return posts[0]
}

export async function updateBlogPost(
  postId: string,
  postData: {
    title?: string
    content?: string
    excerpt?: string
    featured_image?: string
    tags?: string[]
  },
): Promise<BlogPost | null> {
  // First get the current post to check if title is changing
  const currentPostQuery = `SELECT * FROM blog_posts WHERE id = $1`
  const currentPosts = await executeQuery<BlogPost>(currentPostQuery, [postId])

  if (currentPosts.length === 0) {
    return null
  }

  const currentPost = currentPosts[0]
  let slug = currentPost.slug

  // If title is changing, update the slug
  if (postData.title && postData.title !== currentPost.title) {
    slug = postData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  // Build the update query dynamically
  const updateFields = []
  const params = []
  let paramIndex = 1

  if (postData.title) {
    updateFields.push(`title = $${paramIndex}`)
    params.push(postData.title)
    paramIndex++

    updateFields.push(`slug = $${paramIndex}`)
    params.push(slug)
    paramIndex++
  }

  if (postData.content !== undefined) {
    updateFields.push(`content = $${paramIndex}`)
    params.push(postData.content)
    paramIndex++
  }

  if (postData.excerpt !== undefined) {
    updateFields.push(`excerpt = $${paramIndex}`)
    params.push(postData.excerpt)
    paramIndex++
  }

  if (postData.featured_image !== undefined) {
    updateFields.push(`featured_image = $${paramIndex}`)
    params.push(postData.featured_image)
    paramIndex++
  }

  if (postData.tags !== undefined) {
    updateFields.push(`tags = $${paramIndex}`)
    params.push(postData.tags)
    paramIndex++
  }

  updateFields.push(`updated_at = NOW()`)

  // Add the post ID as the last parameter
  params.push(postId)

  const query = `
    UPDATE blog_posts
    SET ${updateFields.join(", ")}
    WHERE id = $${paramIndex}
    RETURNING *
  `

  const posts = await executeQuery<BlogPost>(query, params)

  // Note: In app directory, we would use revalidatePath here
  // For pages directory compatibility, we're removing revalidatePath calls

  return posts[0]
}

export async function deleteBlogPost(postId: string): Promise<boolean> {
  // First get the post to get the slug for revalidation
  const getSlugQuery = `SELECT slug FROM blog_posts WHERE id = $1`
  const slugResult = await executeQuery<{ slug: string }>(getSlugQuery, [postId])

  if (slugResult.length === 0) {
    return false
  }

  const slug = slugResult[0].slug

  // Delete the post
  const query = `DELETE FROM blog_posts WHERE id = $1`
  await executeQuery(query, [postId])

  // Note: In app directory, we would use revalidatePath here
  // For pages directory compatibility, we're removing revalidatePath calls

  return true
}

export async function incrementPostViewCount(postId: string): Promise<void> {
  // Check if a view record exists for this post
  const checkQuery = `
    SELECT id, view_count FROM blog_post_views WHERE post_id = $1
  `

  const existingViews = await executeQuery<BlogPostView>(checkQuery, [postId])

  if (existingViews.length === 0) {
    // Create a new view record
    const insertQuery = `
      INSERT INTO blog_post_views (post_id, view_count, last_viewed_at)
      VALUES ($1, 1, NOW())
    `
    await executeQuery(insertQuery, [postId])
  } else {
    // Update the existing view record
    const updateQuery = `
      UPDATE blog_post_views
      SET view_count = view_count + 1, last_viewed_at = NOW()
      WHERE post_id = $1
    `
    await executeQuery(updateQuery, [postId])
  }
}

export async function getPopularBlogPosts(limit = 5): Promise<BlogPostWithAuthor[]> {
  const query = `
    SELECT 
      bp.*,
      u.first_name || ' ' || u.last_name as author_name,
      u.email as author_email,
      COALESCE(bpv.view_count, 0) as view_count
    FROM 
      blog_posts bp
    LEFT JOIN 
      users u ON bp.author_id = u.id
    LEFT JOIN
      blog_post_views bpv ON bp.id = bpv.post_id
    ORDER BY 
      COALESCE(bpv.view_count, 0) DESC, bp.published_at DESC
    LIMIT $1
  `

  return executeQuery<BlogPostWithAuthor>(query, [limit])
}
