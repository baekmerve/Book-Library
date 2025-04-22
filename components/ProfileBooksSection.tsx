import { BorrowedBookType } from '@/lib/types'
import { cn } from '@/lib/utils'
import BookActionButton from './BookActionButton'
import { returnBook } from '@/lib/actions/book-actions'
import BookCover from './BookCover'
import BoookDataCard from './BoookDataCard'
import BorrowHistoryButton from './BorrowHistoryButton'
import Link from 'next/link'

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
      <h2 className='font-poetsen text-2xl md:text-3xl text-light-100 tracking-normal text-center xl:text-left'>
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
            'mt-5 p-4 rounded-xl w-full flex  gap-7 ',
            horizontalScroll
              ? 'overflow-x-auto flex-nowrap snap-x snap-mandatory scroll-pl-5'
              : 'justify-center sm:justify-start flex-wrap '
          )}
        >
          {records.map((record) => (
            <div
              key={record.borrowRecord.id}
              className='relative rounded-xl flex flex-col snap-start items-center justify-start pt-4 gap-2 bg-[#191b22] min-w-[200px] min-h-[335px] md:min-w-[230px] md:min-h-[390px]  shadow-slate-700 shadow-lg border border-white/10
              '
            >
              {/* Book cover */}
              <div className='relative px-6 py-4'>
                {/* Background color layer */}
                <div
                  className='absolute inset-0 z-10 m-1 rounded-xl'
                  style={{
                    backgroundColor: record.book?.coverColor,
                    opacity: 0.3,
                  }}
                />
                <div className='relative z-20 '>
                  <Link href={`/books/${record.book?.id}`} className='w-full'>
                    <BookCover
                      coverColor={record.book?.coverColor as string}
                      coverImage={record.book?.coverUrl as string}
                      className=' w-[100px] h-[150px] md:w-[120px] md:h-[180px]'
                    />
                  </Link>
                </div>
              </div>
              {/* Book info */}

              <BoookDataCard
                borrowRecord={record.borrowRecord}
                book={record.book!}
                userId={userId}
                isReturned={isReturned}
              />
              {/* Action button */}
              {horizontalScroll && (
                <BorrowHistoryButton
                  bookId={record.borrowRecord.bookId}
                  userId={userId}
                />
              )}
              {!isReturned && (
                <BookActionButton
                  bookId={record.borrowRecord.bookId}
                  userId={userId}
                  handleAction={returnBook}
                  buttonText='Return Now'
                  loadingText='Returning...'
                  className='bg-transparent text-slate-300 hover:bg-transparent hover:scale-105 transition-all duration-300 hover:text-soft-pink '
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
