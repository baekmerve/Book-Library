import { auth } from '@/auth'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  if (session) redirect('/')

  return (
    <main className='relative flex flex-col text-light-100 md:flex-row w-full'>
      <section className=' sticky h-60 w-full md:w-2/3 md:top-0 md:h-screen md:flex-1'>
        <Image
          src='/images/auth.webp'
          alt='auth page image'
          height={1000}
          width={1000}
          className='size-full object-cover'
        />
      </section>

      <section className='flex min-h-screen h-full w-full md:w-1/3 items-center bg-gray-100 px-5 '>
        <div className='mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10'>
          <div className='flex items-center gap-3'>
            <BookOpen className='size-12 text-gray-700' />
            <h1 className='text-2xl font-semibold text-gray-800'>
              Book Library
            </h1>
          </div>
          <div className='text-gray-700'>{children}</div>
        </div>
      </section>
    </main>
  )
}

export default Layout
