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
      <div className='flex flex-col justify-center items-start text-md gap-2 w-full text-white'>
        {/* title-author-genre */}
        <div className=' text-left space-y-2'>
          <p className='text-lg font-semibold w-full break-words leading-tight'>
            {book.title}
          </p>
          <p className='text-base w-full break-words leading-tight'>
            By {book.author}
          </p>
          <p className='text-base italic text-light-100 mt-1'>{book.genre}</p>
        </div>
        {/* borrow infos */}
        <div className=' text-base space-y-2'>
          <p className='flex gap-2'>
            <BookOpenCheck size={20} className='text-blue-300' />
            Borrowed on <span>{borrowDateFormatted}</span>
          </p>

          <p className='flex gap-2 items-center'>
            {isReturned ? (
              <>
                <BadgeCheckIcon size={20} className='text-green-500' /> Returned
                on <span>{borrowRecord?.returnDate}</span>
              </>
            ) : (
              <>
                <Calendar1Icon size={20} className='text-amber-600' />
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
