
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type BlogMeta = {
    title: string
    date: string
    description: string
    slug: string
}

export function getBlogs(): BlogMeta[] {
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
