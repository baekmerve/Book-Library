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
    <section className=' flex flex-wrap items-center mt-10  gap-5'>
      <h2 className=' w-full font-poetsen text-2xl md:text-3xl xl:text-4xl text-center xl:text-left text-light-100 mx-auto '>
        {title}
      </h2>

      <ul
        className={cn(
          'mt-0 md:mt-10 flex w-full ',
          horizontalScroll
            ? ' overflow-x-auto flex-nowrap snap-x snap-mandatory md:scroll-pl-4 gap-0 md:gap-5 py-5 '
            : 'flex-wrap gap-3 md:gap-7 justify-center'
        )}
      >
        {books.map((book) => (
          <li
            key={book.title}
            className={cn(
              'flex flex-col snap-start justify-start items-center  text-white rounded-xl min-h-[320px] hover:-translate-y-4 transition-all duration-300 ease-in-out ',
              horizontalScroll
                ? ' min-w-[150px] md:min-w-[200px]'
                : 'w-[160px] md:w-[180px]'
            )}
          >
            <div className='flex flex-col items-center justify-center w-full relative rounded-xl  '>
              <div className='w-full h-[220px] flex items-center justify-center'>
                <Link href={`/books/${book?.id}`}>
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                    className=' w-[100px] h-[150px] md:w-[130px] md:h-[190px]'
                  />
                </Link>
              </div>
            </div>
            <div className=' text-center px-2'>
              <p className='text-sm md:text-base font-semibold text-white w-full break-words leading-tight'>
                {book.title}
              </p>
              <p className=' text-xs md:text-sm italic text-light-100 mt-1'>
                {book.genre}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SimpleBookList
