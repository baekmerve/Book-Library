import { Book } from '@/lib/types'
import React from 'react'
import Bookcard from './Bookcard'

interface Props {
  title: string
  books: Book[]
  contaierClassname?: string
}

function BookList({ title, books, contaierClassname }: Props) {
  return (
    <section className={contaierClassname}>
      <h2 className='font-bebas text-4xl text-light-100'>{title}</h2>
      <ul className='book-list'>
        {books.map((book) => (
          <Bookcard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  )
}

export default BookList
