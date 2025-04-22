import SimpleBookList from '@/components/SimpleBookList'
import BookNotFound from '@/components/BookNotFound'
import SearchBox from '@/components/SearchBox'
import { fetchAllBooks, fetchBookByKeyword } from '@/lib/actions/book-actions'
import GenreSelect from '@/components/GenreSelect'

const Books = async (props: {
  searchParams?: Promise<{
    query?: string
    genre?: string
  }>
}) => {
  const searchParams = await props.searchParams
  const rawQuery = searchParams?.query || ''
  const selectedGenre = searchParams?.genre || ''
  const searchWord = rawQuery.trim()

  // Fetch all books
  const allBooks = await fetchAllBooks()

  let filteredBooks = allBooks

  // Filter books by keyword if exists

  if (searchWord) {
    filteredBooks = (await fetchBookByKeyword(searchWord)) || []
  }

  // Filter by genre if genre is selected (and not "All")
  if (selectedGenre && selectedGenre !== 'All') {
    filteredBooks = filteredBooks?.filter(
      (book) => book.genre === selectedGenre
    )
  }
  const isFiltered = searchWord || (selectedGenre && selectedGenre !== 'All')

  return (
    <div className='flex flex-col items-center w-full min-h-screen gap-5'>
      <SearchBox />
      <GenreSelect />

      {!isFiltered && <SimpleBookList books={allBooks} />}

      {isFiltered && (
        <div className='w-full mt-5 text-center'>
          <p className='text-xl xl:text-2xl font-bold text-white'>
            Showing results
            {searchWord && (
              <>
                {' for '}
                <span className='font-semibold text-soft-pink'>
                  {searchWord}
                </span>
              </>
            )}
            {selectedGenre && selectedGenre !== 'All' && (
              <>
                {' in '}
                <span className='font-semibold text-primary'>
                  {selectedGenre}
                </span>
              </>
            )}
          </p>

          {filteredBooks.length > 0 ? (
            <SimpleBookList books={filteredBooks} />
          ) : (
            <BookNotFound />
          )}
        </div>
      )}
    </div>
  )
}

export default Books
