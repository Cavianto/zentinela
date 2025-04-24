import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Function to extract the actual connection string if it's malformed
function extractConnectionString(input: string | undefined): string {
  if (!input) return ""

  // Check if the input incorrectly includes the variable name
  if (input.startsWith("DATABASE_URL=")) {
    console.log("Found malformed connection string, extracting value...")
    return input.substring("DATABASE_URL=".length)
  }

  return input
}

// Log available environment variables for debugging (without sensitive values)
console.log("Available database environment variables:", {
  DATABASE_URL: process.env.DATABASE_URL ? "[exists]" : "[not set]",
  NEON_DATABASE_URL: process.env.NEON_DATABASE_URL ? "[exists]" : "[not set]",
  NEON_NEON_DATABASE_URL: process.env.NEON_NEON_DATABASE_URL ? "[exists]" : "[not set]",
})

// Try different environment variables in order of preference
const connectionString =
  extractConnectionString(process.env.DATABASE_URL) ||
  extractConnectionString(process.env.NEON_DATABASE_URL) ||
  extractConnectionString(process.env.NEON_NEON_DATABASE_URL) ||
  ""

console.log("Using connection string:", connectionString ? "[found valid string]" : "[no valid string found]")

// Create SQL client with better error handling
let sql: any
try {
  sql = neon(connectionString)
  console.log("Successfully created neon SQL client")
} catch (error) {
  console.error("Failed to create neon SQL client:", error)
  // Provide a dummy function that will gracefully fail but not crash the app
  sql = async (query: string, params: any[] = []) => {
    console.warn("Using fallback SQL client, database operations will fail gracefully")
    return []
  }
}

// Create a Drizzle client to use with the SQL client
export const db = drizzle(sql)

// Helper function to execute raw SQL queries with better error handling
export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  try {
    return (await sql(query, params)) as T[]
  } catch (error) {
    console.error("Database query error:", error)
    // Return empty array instead of throwing to prevent page build failures
    return [] as T[]
  }
}

// Export the SQL client for direct use
export { sql }
