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
  title: 'Book Library | Discover and Manage Your Favorite Books',
  description:
    'Explore, borrow, and manage your favorite books in a beautifully designed digital library. Personalized account features, book search, and reminders included.',
  keywords: [
    'book library',
    'digital library',
    'online book management',
    'borrow books',
    'library system',
    'book search',
    'React book app',
    'Next.js library project',
  ],
  authors: [{ name: 'Merve B.', url: 'https://www.baekmerve.website' }],
  creator: 'Merve B.',
  publisher: 'Book Library',
  openGraph: {
    title: 'Book Library | Your Digital Reading Companion',
    description:
      'A modern library system where you can browse, borrow, and manage books online. Built with Next.js and Tailwind CSS.',
    url: 'https://book-library-silk-seven.vercel.app/',
    siteName: 'Book Library',

    locale: 'ko_KR',
    type: 'website',
  },

  metadataBase: new URL('https://book-library-silk-seven.vercel.app'),
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
