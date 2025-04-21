import { BorrowedBookType } from '@/lib/types'
import { cn } from '@/lib/utils'
import BookActionButton from './BookActionButton'
import { returnBook } from '@/lib/actions/book-actions'
import BookCover from './BookCover'
import BoookDataCard from './BoookDataCard'
import ReturnHistoryButton from './ReturnHistoryButton'
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
              ? 'overflow-x-auto flex-nowrap snap-x snap-mandatory scroll-pl-5 '
              : 'justify-center sm:justify-start flex-wrap '
          )}
        >
          {records.map((record) => (
            <div
              key={record.borrowRecord.id}
              className={cn(
                'flex flex-col gap-3 snap-start',
                horizontalScroll && ' rounded-xl'
              )}
            >
              {/* Book cover */}
              <div className='relative rounded-xl flex flex-col items-center justify-start pt-4 gap-2 bg-[#12141D] w-[200px] min-h-[335px] md:w-[230px] md:min-h-[390px] shadow-slate-700 shadow-lg'>
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
              </div>
              {!isReturned ? (
                <BookActionButton
                  bookId={record.borrowRecord.bookId}
                  userId={userId}
                  handleAction={returnBook}
                  buttonText='Return Now'
                  loadingText='Returning...'
                  className='bg-slate-700 text-primary hover:bg-primary hover:text-slate-700'
                  variant='return'
                />
              ) : (
                <ReturnHistoryButton
                  bookId={record.borrowRecord.bookId}
                  userId={userId}
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
