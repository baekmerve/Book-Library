import { Session } from 'next-auth'
import React from 'react'

const AdminHeader = ({ session }: { session: Session }) => {
  return (
    <header className='flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5'>
      <div className=''>
        <h2 className='text-slate-700 font-semibold text-2xl'>
          {session?.user?.name}
        </h2>
        <p className='text-base text-slate-500 '>
          Monitor all of your users and books
        </p>
      </div>
      <p>Search</p>
    </header>
  )
}

export default AdminHeader
