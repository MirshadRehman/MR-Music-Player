import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'MR Player',
  description: 'Created with NextJS/typescript',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
        <body>
          <ThemeProvider attribute="class">{children}<Analytics/></ThemeProvider>
        </body>
    </html>
  )
}
