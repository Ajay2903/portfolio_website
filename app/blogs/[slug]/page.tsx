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
    <article className="flex flex-col gap-4 w-full max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold md:text-4xl">{data.title}</h1>
      <div className="flex flex-row">
      <p className="text-sm text-gray-500">by Ajay Tibrewal</p>
      <div className="flex-1"></div>
      <p className="text-sm text-gray-500">{data.date}</p>

      </div>
      <img className="w-full h-64  object-cover" src={data.src} alt="img" />
      
      <MDXRenderer source={content} />
    </article>
  )
}
