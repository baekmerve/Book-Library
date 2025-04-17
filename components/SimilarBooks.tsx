import { fetchSimilarBook } from '@/lib/actions/book-actions'
import React from 'react'
import BookCover from './BookCover'
import Link from 'next/link'

const SimilarBooks = async ({ genre }: { genre: string }) => {
  const similarBookList = await fetchSimilarBook(genre)


  if (!similarBookList?.length) return null
  return (
    <section className='w-full flex flex-col gap-6'>
      <h3 className='text-xl font-semibold text-soft-pink'>
        More Similar Books
      </h3>

      <div className='flex flex-wrap gap-7 items-center '>
        {similarBookList?.map((book) => (
          <div
            key={book.id}
            className=' shadow-xl shadow-black hover:shadow-indigo-300/20 transition duration-300 '
          >
            <Link href={`/books/${book.id}`} className='w-full'>
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                className='w-[120px] h-[160px]'
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SimilarBooks
