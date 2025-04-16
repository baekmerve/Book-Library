import { BorrowedBookType } from '@/lib/types'
import BoookDataCard from './BoookDataCard'
import { cn } from '@/lib/utils'
import BookCover from './BookCover'
import BookActionButton from './BookActionButton'
import { returnBook } from '@/lib/actions/book-actions'

interface BookListSectionProps {
  title: string
  records: BorrowedBookType[]
  userId: string
  isReturned: boolean
  horizontalScroll?: boolean
}

const ProfileBooksSection = ({
  title,
  records,
  userId,
  isReturned,
  horizontalScroll = false,
}: BookListSectionProps) => {
  return (
    <section className='w-full flex flex-col p-4 rounded-xl'>
      <h2 className='font-bebas text-3xl text-light-100 tracking-wider text-center xl:text-left'>
        {title}
      </h2>

      {records.length === 0 ? (
        <div className='w-full p-10'>
          <p className='text-white font-semibold text-center'>
            {isReturned ? 'No returned book.' : 'No borrowed book history.'}
          </p>
        </div>
      ) : (
        <div
          className={cn(
            'mt-5 p-4 rounded-xl w-full flex gap-7',
            horizontalScroll
              ? 'overflow-x-auto flex-nowrap snap-x snap-mandatory scroll-pl-4'
              : 'flex-wrap'
          )}
        >
          {records.map((record) => (
            <div
              key={record.borrowRecord.id}
              className={cn(
                'flex flex-col gap-3 snap-start',
                horizontalScroll && 'min-w-[300px]'
              )}
            >
              <div className='relative rounded-xl flex flex-col items-center justify-start px-5 py-2 gap-4  bg-[#12141D]  w-[300px]  h-[460px] '>
                {/* Book cover */}
                <div className='relative p-6 h-[250px]'>
                  {/* Background color layer */}
                  <div
                    className='absolute inset-0 z-10 m-1 rounded-xl'
                    style={{
                      backgroundColor: record.book?.coverColor,
                      opacity: 0.3,
                    }}
                  />
                  <div className='relative z-20 '>
                    <BookCover
                      coverColor={record.book?.coverColor as string}
                      coverImage={record.book?.coverUrl as string}
                      className='w-[150px] h-[190px]'
                      id={record.book?.id}
                    />
                  </div>
                </div>
                {/* Book info */}
                <div className=' w-full'>
                  <BoookDataCard
                    borrowRecord={record.borrowRecord}
                    book={record.book!}
                    userId={userId}
                    isReturned={isReturned}
                  />
                </div>
              </div>
              {!isReturned && (
                <BookActionButton
                  bookId={record.borrowRecord.bookId}
                  userId={userId}
                  handleAction={returnBook}
                  buttonText='Return Now'
                  loadingText='Returning...'
                  className='bg-slate-700 text-primary hover:bg-primary hover:text-slate-700'
                  variant='return'
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
export default ProfileBooksSection
