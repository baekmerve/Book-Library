import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Inter, Poetsen_One } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const poetsen = Poetsen_One({
  subsets: ['latin'],
  variable: '--font-poetsen',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Book Library',
  description: 'A Book Library website',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={` ${poetsen.variable} ${inter.variable} antialiased`}>
          {children}
          <Toaster richColors />
        </body>
      </SessionProvider>
    </html>
  )
}
export default RootLayout
