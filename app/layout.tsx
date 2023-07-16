import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cult Chat Ai',
  description: 'Ai personalites powered by OpenAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <head>
      <title>Cult Chat</title>
      </head>
      
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
