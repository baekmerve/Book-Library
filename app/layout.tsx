import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Head from 'next/head'

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
})

const bebas = localFont({
  src: [
    { path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--bebas',
})

export const metadata: Metadata = {
  title: 'Book Library',
  description: 'A Book Library website',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <Head>
        <link
          rel='preconnect'
          href='https://ik.imagekit.io'
          crossOrigin='anonymous'
        />
        <link rel='dns-prefetch' href='https://ik.imagekit.io' />
      </Head>
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
