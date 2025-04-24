import { exec } from "child_process"

// Run the seed script
console.log("Running seed script...")
exec("npx tsx scripts/seed-blog-posts.ts", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`)
    return
  }
  console.log(stdout)
})
