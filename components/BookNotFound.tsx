import Image from 'next/image'
import React from 'react'

const BookNotFound = () => {
  return (
    <div className='flex justify-center items-center flex-col text-center w-full mt-10'>
      <div className='h-[200px] w-[200px]'>
        <Image
          src='/images/not-found.png'
          alt='no results'
          width={200}
          height={200}
          className='w-full object-contain'
        />
      </div>
      <>
        <h4 className='text-white mt-6 font-semibold text-2xl'>
          No Results Found
        </h4>
        <p className='text-light-100 w-[360px] mt-1'>
          We couldn’t find any books matching your search. Try using different
          keywords or check for typos.
        </p>
      </>
    </div>
  )
}

export default BookNotFound
