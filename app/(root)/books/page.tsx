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
    <div>
      <div className='flex flex-col items-center w-full min-h-screen gap-5'>
        <div className='flex flex-col items-center gap-4 md:w-[430px] xl:w-[630px]'>
          <h1 className='text-lg md:text-xl uppercase text-white'>
            Discover Your Next Great Read:
          </h1>
          <h1 className='text-center text-4xl xl:text-[56px] font-bold line-clamp-2 w-fit leading-snug text-white'>
            Explore and Search for{' '}
            <span className='text-primary'>Any Book</span> In Our Library
          </h1>
          <div className='w-full relative '>
            <SearchBox />
          </div>
        </div>

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
    </div>
  )
}

export default Books
