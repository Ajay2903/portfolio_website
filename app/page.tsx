"use client"
import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ExternalLink, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "../components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export type BlogMeta = {
  title: string
  date: string
  description: string
  slug: string
}

export default function Portfolio() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([])
  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e:any) => {
      const href = e.currentTarget.getAttribute("href")
      if (href?.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for header height
            behavior: "smooth",
          })
        }
      }
    }
    
    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick)
    })
    fetch("/api/blogs")
      .then(res => res.json())
      .then((data: BlogMeta[]) => {
        const latest = data.slice(0, 3)
        setBlogs(latest)
      })
      .catch((error) => {
        console.error("Failed to fetch blogs:", error);
      });
    // Cleanup
    return () => {
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick)
      })
    }
  }, [])
   

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Ajay Tibrewal</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="/blogs" className="transition-colors hover:text-foreground/80">
               Blogs
              </Link>
              <Link href="#skills" className="transition-colors hover:text-foreground/80">
                Skills
              </Link>
              <Link href="#projects" className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between md:justify-end md:space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="mb-6 text-lg font-bold">Menu</SheetTitle>
                <Link href="/" className="flex items-center">
                  <span className="font-bold">Ajay Tibrewal</span>
                </Link>
                <nav className="mt-6 flex flex-col space-y-4">
                  <Link href="#about" className="text-lg font-medium">
                    About
                  </Link>
                  <Link href="/blogs" className="text-lg font-medium">
               Blogs
              </Link>
                  <Link href="#skills" className="text-lg font-medium">
                    Skills
                  </Link>
                  <Link href="#projects" className="text-lg font-medium">
                    Projects
                  </Link>
                  <Link href="#contact" className="text-lg font-medium">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="flex items-center">
                           <ThemeToggle />

              <Link href="https://github.com/Ajay2903" target="_blank" rel="noreferrer" className="p-2">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/ajay-tibrewal" target="_blank" rel="noreferrer" className="p-2">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Ajay Tibrewal</h1>
                  <p className="text-xl text-muted-foreground">Full Stack Developer</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button>Contact Me</Button>
                  </Link>
                  <Link href="#projects">
                    <Button variant="outline">View Projects</Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/portpic.jpeg"
                  alt="Profile"
                  width={400}
                  height={400}

                  
                  className="rounded-full object-cover border-4 border-border"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                I'm a full-stack developer passionate about AI-driven applications, crafting seamless experiences with Next.js, React, and robust backends in Node.js, Go, and Python. I specialize in serverless solutions like Firebase and Supabase, with expertise in PostgreSQL and SQL databases.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  My technical toolkit includes a wide range of technologies for both frontend and backend development.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 pt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M12 19l9 2-9-18-9 18 9-2z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Frontend</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge>React</Badge>
                      <Badge>Next.js</Badge>
                      <Badge>TypeScript</Badge>
                      <Badge>Tailwind CSS</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
                      <line x1="8" y1="16" x2="8.01" y2="16" />
                      <line x1="8" y1="20" x2="8.01" y2="20" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                      <line x1="12" y1="22" x2="12.01" y2="22" />
                      <line x1="16" y1="16" x2="16.01" y2="16" />
                      <line x1="16" y1="20" x2="16.01" y2="20" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Backend</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge>Node.js</Badge>
                      <Badge>Go</Badge>
                      <Badge>Python</Badge>
                      <Badge>Firebase</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Database</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge>Supabase</Badge>
                      <Badge>PostgreSQL</Badge>
                      <Badge>MySQL</Badge>
                      <Badge>Redis</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M12 3a9 9 0 1 0 9 9" />
                      <path d="M12 3v9l9 9" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">DevOps</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge>Docker</Badge>
                      <Badge>Render</Badge>
                      <Badge>AWS</Badge>
                      <Badge>Vercel</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blogs</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Some of my latest writings and thoughts.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog.slug} className="border p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <time className="block mb-2 text-gray-500">{new Date(blog.date).toLocaleDateString()}</time>
                <p className="text-muted-foreground">{blog.description}</p>
                <Link href={`/blogs/${blog.slug}`} className="mt-4 inline-block text-blue-600 hover:underline">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Here are some of my recent projects that showcase my skills and experiences.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-8">
                <Card>
                  <CardHeader>
                    <Image
                      src="News3.png"
                      alt="Project 1"
                      width={400}
                      height={200}
                      className="rounded-md object-cover"
                    />
                    <CardTitle className="mt-4">News.AI</CardTitle>
                    <CardDescription>Full-Stack News Aggregator with Real-Time User Personalization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">Next.js</Badge>
                      <Badge variant="outline">Firebase</Badge>
                      <Badge variant="outline">Typescript</Badge>
                      <Badge variant="outline">REST Api</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                    Built a dynamic news platform using Next.js and Firebase, integrating NewsAPI to deliver categorized global headlines. Features secure user authentication, real-time saved articles syncing, and responsive design.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href="https://github.com/Ajay2903/NewsAi" target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </Link>
                    <Link href="https://news-ai-lemon.vercel.app/" target="_blank" rel="noreferrer">
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Image
                      src="/climapure.png?height=200&width=400"
                      alt="Project 2"
                      width={400}
                      height={200}
                      className="rounded-md object-cover"
                    />
                    <CardTitle className="mt-4">ClimaPure</CardTitle>
                    <CardDescription>Responsive Weather & AQI Dashboard </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">Vue.js</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <Badge variant="outline">Google Maps API</Badge>
                
                    </div>
                    <p className="text-sm text-muted-foreground">
                   Developed a performant dashboard in Vue/Tailwind, integrating live weather and AQI data with secure, dynamic Google Maps API utilization.Solved complex, progressive layout challenges, implementing a dynamic 2-to-3 column grid for pixel-perfect, tailored display from mobile to ultrawide screens.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href="https://github.com/Ajay2903/MapQI" target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </Link>
                    <Link href="https://map-qi.vercel.app/" target="_blank" rel="noreferrer">
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Image
                      src="/dpa2.png?height=200&width=400"
                      alt="Project 3"
                      width={400}
                      height={200}
                      className="rounded-md object-cover"
                    />
                    <CardTitle className="mt-4">Health Link</CardTitle>
                    <CardDescription>A full-stack healthcare solution for managing patients and prescriptions digitally.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">Flutter</Badge>
                      <Badge variant="outline">Firebase</Badge>
                      <Badge variant="outline">Cloud Firestore</Badge>
                      <Badge variant="outline">Riverpod</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A real-time doctor-patient platform enabling doctors to manage patients, send digital prescriptions, and chat securely. Built with Firebase for seamless authentication, data storage, and real-time messaging.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href="https://github.com/Ajay2903/Principles-of-Database-Systems-FInal-Project-SP-23" target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </Link>
                    <Link href="#" target="_blank" rel="noreferrer">
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
              </div>
            </div>
          </div>
        </section>
        
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  I'm currently available for freelance work, part time and full-time opportunities. If you have a project that
                   where I can be of help, let's talk!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-4 pt-8">
                <div className="flex items-center justify-center space-x-4">
                  <Link href="mailto:john.doe@example.com" className="flex items-center space-x-2">
                    <Button variant="outline" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      ajay29t@gmail.com
                    </Button>
                  </Link>
                </div>
                <div className="flex justify-center space-x-4">
                  <Link href="https://github.com/Ajay2903" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com/in/ajay-tibrewal" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Developed by Ajay Tibrewal
          </p>
          {/* <div className="flex items-center gap-4">
            <Link href="#" className="text-sm underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm underline underline-offset-4">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </footer>
    </div>
  )
}

