import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

const ibm = localFont({
  src: [
    {
      path: '/fonts/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/IBMPlexSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '/fonts/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '/fonts/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})

const bebas = localFont({
  src: [
    { path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Book Library',
  description: 'A Book Library website',
  other: {
    preconnect: 'https://ik.imagekit.io',
  },
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${ibm.className} ${bebas.variable} antialiased`}>
          {children}
          <Toaster richColors />
        </body>
      </SessionProvider>
    </html>
  )
}
export default RootLayout
