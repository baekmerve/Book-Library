import { Book } from '@/lib/types'
import React from 'react'
import { cn } from '@/lib/utils'
import BookCover from './BookCover'
import Link from 'next/link'

interface Props {
  title?: string
  books: Book[]
  horizontalScroll?: boolean
}

const SimpleBookList = ({ title, books, horizontalScroll }: Props) => {
  if (books.length < 1) return

  return (
    <section className=' mt-28 flex flex-wrap items-center gap-5 '>
      <h2 className=' w-full font-bebas text-4xl text-center xl:text-left text-light-100 mx-auto'>
        {title}
      </h2>

      <ul
        className={cn(
          ' mt-10 flex w-full',
          horizontalScroll
            ? ' overflow-x-auto flex-nowrap snap-x snap-mandatory scroll-pl-4 gap-10  pb-10'
            : 'flex-wrap gap-x-2 gap-y-7 justify-center '
        )}
      >
        {books.map((book) => (
          <li
            key={book.title}
            className={cn(
              'flex flex-col snap-start justify-start items-center text-white rounded-xl ',
              horizontalScroll
                ? 'h-[350px] min-w-[250px]'
                : 'h-[350px] w-[250px]'
            )}
          >
            <div className='flex flex-col items-center justify-center w-full h-[220px] relative rounded-xl overflow-hidden'>
              <div className='w-full h-[220px] flex items-center justify-center'>
                <Link href={`/books/${book?.id}`}>
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                    className='w-[150px] h-[190px]'
    
                  />
                </Link>
              </div>
            </div>
            <div className='mt-4 text-center px-2'>
              <p className='text-lg font-semibold text-white w-full break-wordsleading-tight'>
                {book.title}
              </p>
              <p className='text-sm italic text-light-100 mt-1'>{book.genre}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SimpleBookList
