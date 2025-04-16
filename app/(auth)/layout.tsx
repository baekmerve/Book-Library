import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  if (session) redirect('/')

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      {/* Full Background Image */}
      <Image
        src='/images/auth.webp'
        alt='auth page image'
        fill
        className='object-cover z-0'
      />

      {/* Blurred Overlay Container */}
      {/* <div className='relative z-10 mx-5 w-full max-w-xl rounded-xl p-10 bg-white/20 backdrop-blur-md '> */}
      <div className='relative z-10 mx-5 w-full max-w-xl min-h-[500px] rounded-xl p-10 bg-white/20 backdrop-blur'>
        {/* Header */}
        <div className='mb-6 flex items-center gap-3'>
          <Image src='/icons/logo.svg' alt='logo' width={37} height={37} />
          <h1 className='text-2xl font-semibold text-white'>Book Library</h1>
        </div>

        {/* Form Content */}
        <div className='text-light-100'>{children}</div>
      </div>
    </main>
  )
}

export default Layout
