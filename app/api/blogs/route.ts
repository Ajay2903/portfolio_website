// app/api/blogs/route.ts

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const blogDir = path.join(process.cwd(), "content/blogs")
        const files = fs.readdirSync(blogDir)

        const blogs = files.map((filename) => {
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

        return NextResponse.json(blogs)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 })
    }
}
