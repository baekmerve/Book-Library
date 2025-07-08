import React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from './ui/dialog'

import { Button } from './ui/button'

import { fecthBorrowReturnRecords } from '@/lib/actions/book-actions'
import { CalendarDaysIcon, HistoryIcon, LibraryBigIcon } from 'lucide-react'
interface Props {
  bookId: string
  userId: string
  title: string
}
const BorrowHistoryButton = async ({ bookId, userId, title }: Props) => {
  const returnHistory = await fecthBorrowReturnRecords(userId, bookId)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=' self-center bg-light-100 w-fit cursor-pointer mb-2 text-black text-xs rounded-sm '>
          <HistoryIcon />
          History
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-[80%] sm:max-w-[550px] rounded-2xl shadow-xl border border-gray-700 bg-gray-950'>
        <DialogHeader>
          <DialogTitle className='text-lg md:text-xl font-poetsen text-blue-200'>
            Borrow History of :
            <span className='ml-2 text-soft-pink  '>`{title}`</span>
          </DialogTitle>
          <DialogDescription className='text-sm md:text-base  text-gray-400'>
            You can check the borrow and return dates of the book here.
          </DialogDescription>
        </DialogHeader>

        <div className='w-full mt-4 rounded-lg overflow-hidden p-1 '>
          <div className='flex justify-between bg-gray-800 px-6 py-3 text-blue-200 text-base font-medium border border-gray-700 rounded-t-lg'>
            <p className='flex items-center gap-2'>
              <LibraryBigIcon className='size-5 text-amber-600' />{' '}
              <span>Borrow Date</span>
            </p>
            {/* <span>📅 Borrow Date</span> */}
            <p className='flex items-center gap-2'>
              <CalendarDaysIcon className='size-5 text-blue-500' />{' '}
              <span>Return Date</span>
            </p>
          </div>

          <div className='divide-y divide-gray-700 border-x border-b border-gray-700'>
            {!returnHistory.length ? (
              <p className='text-center py-6 text-gray-400'>
                No return history found.
              </p>
            ) : (
              returnHistory.map((record) => (
                <div
                  key={record.id}
                  className='flex justify-between items-center px-6 py-3 text-sm text-gray-100'
                >
                  <span>
                    {new Date(record.borrowDate).toLocaleDateString()}
                  </span>
                  <span>
                    {record.returnDate
                      ? new Date(record.returnDate).toLocaleDateString()
                      : 'Not returned yet'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BorrowHistoryButton
