'use client'

import { useEffect } from 'react'
import { Frown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className='flex flex-col items-center justify-center h-screen gap-10 text-white'>
      <Frown className='w-28 h-28 text-white' />
      <h2 className='text-5xl font-semibold'>Something went wrong</h2>
      <p className='text-gray-200 text-xl text-center'>
        We couldn’t load the requested page. Please try again.
      </p>
      <div className='flex gap-4'>
        <Button
          onClick={() => reset()}
          className='rounded-md bg-primary text-base text-white transition-colors hover:bg-soft-pink py-7 px-9'
        >
          Try Again
        </Button>
        <Button
          asChild
          className='rounded-md bg-primary text-base text-white transition-colors hover:bg-soft-pink py-7 px-9'
        >
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    </main>
  )
}
