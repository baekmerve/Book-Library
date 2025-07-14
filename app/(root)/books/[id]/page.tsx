import { auth } from '@/auth'
import BookOverview from '@/components/BookOverview'
import BookActionButton from '@/components/BookActionButton'
import { isBookBorrowed, fetchBookById } from '@/lib/actions/book-actions'
import SimilarBooks from '@/components/SimilarBooks'
import { notFound } from 'next/navigation'
import SameAuthorBooks from '@/components/SameAuthorBooks'

const BookDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const [session, bookDetails] = await Promise.all([auth(), fetchBookById(id)])

  const userId = session?.user?.id as string

  if (!bookDetails) {
    notFound()
  }

  const availableToBorrow = bookDetails.availableCopies > 0

  const alreadyBorrowed = await isBookBorrowed(userId, id)

  return (
    <div className='flex flex-col gap-10 w-full'>
      <BookOverview {...bookDetails} />

      <BookActionButton
        bookId={id}
        userId={userId}
        availableToBorrow={availableToBorrow}
        buttonText={alreadyBorrowed ? 'Return Now' : 'Borrow Book'}
        loadingText={alreadyBorrowed ? 'Returning...' : 'Borrowing...'}
        redirectPath={alreadyBorrowed ? '/my-profile' : ''}
        className={
          alreadyBorrowed
            ? 'bg-slate-700 text-primary hover:bg-primary hover:text-slate-700'
            : 'mt-4 bg-primary text-dark-100 hover:bg-primary/90'
        }
        variant={alreadyBorrowed ? 'return' : 'borrow'}
      />

      <div className=' mt-16 mb-20 flex flex-col gap-16 lg:flex-row'>
        {/* Left side -  Summary */}
        <div className='flex flex-col gap-10 w-full xl:w-1/2 '>
          {/* Book Summary */}
          <section className='flex flex-col gap-4'>
            <h3 className='text-lg md:text-2xl  font-poetsen text-primary'>
              Book Summary
            </h3>
            <div className='space-y-4  text-sm md:text-base text-light-100 leading-relaxed'>
              {bookDetails.summary.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>
        </div>
        {/* Right side - Similar Books */}
        <div className='flex flex-col gap-10 w-full xl:w-1/2 '>
          {/* Similar Books */}
          <SimilarBooks genre={bookDetails.genre} bookId={bookDetails.id} />

          <SameAuthorBooks
            author={bookDetails.author}
            bookId={bookDetails.id}
          />
        </div>
      </div>
    </div>
  )
}

export default BookDetails
