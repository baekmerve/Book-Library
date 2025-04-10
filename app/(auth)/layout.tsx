import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  if (session) redirect('/')

  return (
    <main className='relative flex flex-col-reverse text-light-100 sm:flex-row'>
      <section className='auth-form'>
        <div className='mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10'>
          <div className='flex flex-row gap-3'>
            <Image src='/icons/logo.svg' alt='logo' width={37} height={37} />
            <h1 className='text=2xl font-semibold text-white'>Book Library</h1>
          </div>
          <div className=''>{children}</div>
        </div>
      </section>
      <section className='sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1'>
        <Image
          src='/images/auth-image.png'
          alt='auth page image'
          height={1000}
          width={1000}
          className='size-full object-cover'
        />
      </section>
    </main>
  )
}

export default Layout
