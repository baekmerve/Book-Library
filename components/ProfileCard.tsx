import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getInitials } from '@/lib/utils'
import { UserAccountType } from '@/lib/types'

interface Props {
  accountDetails: UserAccountType
  userName: string
  email: string
}
const ProfileCard = ({ userName, email, accountDetails }: Props) => {
  const initials = getInitials(userName)
  return (
    <section className='relative flex flex-col gap-12 items-start rounded-3xl p-8 sm:p-14 shadow-xl shadow-black/30 border xl:mt-22 border-white/10 xl:w-[40%] h-fit bg-gradient-to-br from-dark-100 via-[#1d1f24] to-[#232732] hover:shadow-primary/30 transition-all'>
      <div className='flex items-center gap-4 mb-6'>
        <Avatar className='w-16 h-16'>
          <AvatarFallback className='text-xl font-bold'>
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className='font-medium mt-3 text-white line-clamp-1 w-full break-words'>
            {userName}
          </h2>
          <p className='text-light-100 text-sm line-clamp-1 break-words w-ful'>
            {email}
          </p>
        </div>
      </div>

      <div className='space-y-3 text-white'>
        <h1 className='font-poetsen text-2xl text-light-100 border-b-2 border-soft-pink pb-2'>
          Account Details
        </h1>
        <p className='book_card'>
          <span>Account Created: </span>
          {accountDetails?.createdAt?.toLocaleDateString()}
        </p>
        <p className='book_card'>
          <span>Total Books Borrowed: </span>
          {accountDetails?.borrowRecords?.length}
        </p>
        <p className='book_card'>
          <span>Returned:</span>{' '}
          {
            accountDetails?.borrowRecords?.filter(
              (book) => book?.borrowRecord.status === 'RETURNED'
            ).length
          }
        </p>
        <p className='book_card'>
          <span>Currently Borrowed: </span>
          {
            accountDetails?.borrowRecords?.filter(
              (book) => book?.borrowRecord.status === 'BORROWED'
            ).length
          }
        </p>
      </div>
    </section>
  )
}

export default ProfileCard
