import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

type BlogMeta = {
  title: string
  date: string
  description: string
  slug: string
}

function getBlogs(): BlogMeta[] {
  const blogDir = path.join(process.cwd(), "content/blogs")
  const files = fs.readdirSync(blogDir)

  return files.map((filename) => {
    const filePath = path.join(blogDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(fileContent)
    return {
      title: data.title,
      date: data.date,
      description: data.description,
      slug: filename.replace(".mdx", ""),
    }
  })
}

export default function BlogIndex() {
  const blogs = getBlogs()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">My Blogs</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog.slug} className="border p-4 rounded-lg">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-muted-foreground">{blog.description}</p>
            <p className="text-sm text-gray-500">{blog.date}</p>
            <Link href={`/blogs/${blog.slug}`} className="text-blue-600 hover:underline">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
