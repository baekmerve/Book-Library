import SimpleBookList from '@/components/SimpleBookList'
import BookSlide from '@/components/BookSlide'
import { fetchLatestBooks } from '@/lib/actions/book-actions'

export default async function Home() {
  const latestBooks = await fetchLatestBooks()

  return (
    <div className=''>
      <BookSlide latestBooks={latestBooks} />
      <SimpleBookList
        title='Recently Added'
        books={latestBooks}
        horizontalScroll
      />
    </div>
  )
}
