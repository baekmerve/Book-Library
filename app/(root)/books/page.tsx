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

      {!searchWord && !searchWord.trim() && <SimpleBookList books={bookList} />}

      <div className='w-full '>
        {searchWord.trim() && (
          <div className='mt-10 text-center'>
            <p className='text-xl xl:text-2xl font-bold text-white'>
              Search Results for{' '}
              <span className='font-semibold text-soft-pink'>{searchWord}</span>
            </p>

            {searchResult && searchResult.length > 0 ? (
              <SimpleBookList  books={searchResult} />
            ) : (
              <BookNotFound />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Books
