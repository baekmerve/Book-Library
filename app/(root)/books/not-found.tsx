import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='flex flex-col items-center justify-center h-screen text-white gap-10 -mt-32'>
      <Frown className='w-28 h-28 text-white' />
      <h2 className='text-5xl font-semibold'>404 Not Found</h2>
      <p className='text-gray-200 text-xl'>Could not find the books page.</p>
      <Button
        asChild
        className='rounded-md bg-primary text-base text-white transition-colors hover:bg-soft-pink py-7 px-9'
      >
        <Link href='/'>Back to Home</Link>
      </Button>
    </main>
  )
}
