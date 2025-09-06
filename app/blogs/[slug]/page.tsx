import fs from "fs"
import path from "path"
import matter from "gray-matter"
import MDXRenderer from "../../../components/MDXRender";

type BlogParams = {
  params: { slug: string }
}

export default async function BlogPost({ params }: BlogParams) {
  const { slug } = await params
  const blogDir = path.join(process.cwd(), "content/blogs")
  const filePath = path.join(blogDir, `${slug}.mdx`)

  const fileContent = await fs.promises.readFile(filePath, "utf-8")
  const { content, data } = matter(fileContent)

  return (
    <article className="container mx-auto py-12 prose">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="text-sm text-gray-500">{data.date}</p>
      <MDXRenderer source={content} />
    </article>
  )
}
