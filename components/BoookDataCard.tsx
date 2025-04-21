import { Book, BorrowRecord } from '@/lib/types'
import { BadgeCheckIcon, BookOpenCheck, Calendar1Icon } from 'lucide-react'
import { remainedDaysUntilDue } from '@/lib/utils'

interface Props {
  borrowRecord: BorrowRecord
  book: Book
  userId: string
  isReturned: boolean
}

const BoookDataCard = async ({
  borrowRecord,
  book,
  isReturned = false,
}: Props) => {
  const daysLeft = remainedDaysUntilDue(borrowRecord.dueDate as string)

  const borrowDateFormatted = borrowRecord?.borrowDate
    ?.toISOString()
    .slice(0, 10)

  return (
    <>
      <div className='flex flex-col justify-center items-start  gap-2 w-full text-white pl-4 pr-2'>
        {/* title-author-genre */}
        <div className=' text-left space-y-1'>
          <p className='text-sm md:text-base font-semibold w-full break-words leading-tight'>
            {book.title}
          </p>
          <p className='text-xs md:text-sm w-full break-words leading-tight'>
            By {book.author}
          </p>
          <p className='text-xs md:text-sm italic text-light-100 '>
            {book.genre}
          </p>
        </div>
        {/* borrow infos */}
        <div className=' text-xs md:text-sm space-y-1'>
          <p className='flex flex-wrap gap-2 items-center'>
            <BookOpenCheck className='text-blue-300 size-4 md:size-5' />
            Borrowed : <span>{borrowDateFormatted}</span>
          </p>

          <p className='flex flex-wrap gap-2 items-center'>
            {isReturned ? (
              <>
                <BadgeCheckIcon className='text-green-500 size-4 md:size-5' />
                Returned :<span>{borrowRecord?.returnDate}</span>
              </>
            ) : (
              <>
                <Calendar1Icon className='text-amber-600 size-4 md:size-5' />
                {daysLeft}
                <span>days left to due</span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  )
}

export default BoookDataCard
