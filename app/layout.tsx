import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ajay Tibrewal Portfolio',
  description: 'Developer Portfolio',
  generator: 'Developed by Ajay Tibrewal',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
