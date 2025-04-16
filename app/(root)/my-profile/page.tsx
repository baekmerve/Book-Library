import { auth } from '@/auth'
import ProfileBooksSection from '@/components/ProfileBooksSection'
import ProfileCard from '@/components/ProfileCard'
import { getAccountDetails } from '@/lib/actions/auth-actions'



const UserProfile = async () => {
  const session = await auth()
  const userId = session?.user?.id ?? ''
  const accountDetails = await getAccountDetails(userId)

  const returnedBookList = accountDetails.borrowRecords
    .filter((record) => record.borrowRecord.status === 'RETURNED')
    .sort((a, b) => {
      const dateA = a.borrowRecord.returnDate
        ? new Date(a.borrowRecord.returnDate).getTime()
        : 0
      const dateB = b.borrowRecord.returnDate
        ? new Date(b.borrowRecord.returnDate).getTime()
        : 0
      return dateB - dateA // Latest returned first
    })
    .slice(0, 10)

  const currentlyBorrowedList = accountDetails.borrowRecords.filter(
    (record) => record.borrowRecord.status === 'BORROWED'
  )

  return (
    <div className='w-full mx-auto flex flex-col gap-8 py-4 px-2 sm:px-4 xl:px-0'>
      <div className='w-full flex flex-col xl:flex-row   gap-6 xl:gap-10 '>
        {/* PROFILE INFO  */}
        <ProfileCard
          userName={session?.user?.name ?? ''}
          email={session?.user?.email ?? ''}
          accountDetails={accountDetails}
        />
        {/* CURRENTLY BORROWED */}
        <div className='xl:w-[70%] w-full'>
          <ProfileBooksSection
            title='Currently Borrowing'
            records={currentlyBorrowedList}
            userId={userId}
            isReturned={false}
          />
        </div>
      </div>
      {/* BORROW HISTORY */}

      <ProfileBooksSection
        title='Returned Books'
        records={returnedBookList}
        userId={userId}
        isReturned={true}
        horizontalScroll
      />
    </div>
  )
}

export default UserProfile
