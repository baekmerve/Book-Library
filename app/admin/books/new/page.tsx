import BookForm from '@/components/admin/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NewBook = () => {
  return (
    <>
      <Button
        asChild
        className='mb-10 w-fit p-5 border-2 border-primary bg-white text-sm font-medium text-black/90 hover:bg-primary cursor-pointer'
      >
        <Link 
        href='/admin/books'>
          Go Back
        </Link>
      </Button>
      <section className='w-full max-w-2xl'>
        <BookForm type='create' />
      </section>
    </>
  )
}

export default NewBook
