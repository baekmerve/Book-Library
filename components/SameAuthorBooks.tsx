import { fetchSameAuthorBook } from '@/lib/actions/book-actions'
import React from 'react'
import BookCover from './BookCover'
import Link from 'next/link'

interface Props {
  author: string
  bookId: string
}

const SameAuthorBooks = async ({ author, bookId }: Props) => {
  const bookList = await fetchSameAuthorBook(author, bookId)

  if (!bookList?.length) return null
  return (
    <section className='w-full flex flex-col gap-6'>
      <h3 className='text-base md:text-xl  font-poetsen text-blue-200'>
        Author&apos;s Other Books
      </h3>
      <div className='flex flex-wrap gap-7 items-center '>
        {bookList?.map((book) => (
          <div
            key={book.id}
            className=' shadow-xl shadow-black hover:shadow-indigo-300/20 transition duration-300 '
          >
            <Link href={`/books/${book.id}`} className='w-full'>
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                className=' w-[100px] h-[150px] md:w-[130px] md:h-[190px]'
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SameAuthorBooks
