import SimpleBookList from '@/components/SimpleBookList'
import BookNotFound from '@/components/BookNotFound'
import SearchBox from '@/components/SearchBox'
import { fetchAllBooks, fetchBookByKeyword } from '@/lib/actions/book-actions'

const Books = async (props: {
  searchParams?: Promise<{
    query?: string
  }>
}) => {
  const searchParams = await props.searchParams
  const rawQuery = searchParams?.query || ''
  const searchWord = rawQuery.trim()
  const bookList = await fetchAllBooks()
  const searchResult = searchWord
    ? await fetchBookByKeyword(searchWord)
    : bookList

  return (
    <div className='flex flex-col items-center w-full min-h-screen gap-5'>
      <SearchBox />

      {!searchWord && !searchWord.trim() && (
        <SimpleBookList title='All Books' books={bookList} />
      )}

      <div className='w-full '>
        {searchWord.trim() && (
          <>
            <p className='text-xl lg:text-3xl font-bold text-white'>
              Search Results for{' '}
              <span className='font-semibold text-primary'>{searchWord}</span>
            </p>

            {searchResult && searchResult.length > 0 ? (
              <SimpleBookList title='Searched Books' books={searchResult} />
            ) : (
              <BookNotFound />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Books
