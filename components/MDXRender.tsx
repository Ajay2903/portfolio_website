"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";

export default function MDXRenderer({ source }: { source: string }) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    serialize(source).then(setMdxSource);
  }, [source]);

  if (!mdxSource) return <div>Loading...</div>;

  return <MDXRemote {...mdxSource} />;
}