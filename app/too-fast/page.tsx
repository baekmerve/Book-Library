import React from 'react'

const Page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
      <h1 className='font-bebas text-5xl font-bold text-light-100'>
        you are too fast !
      </h1>
      <p className='mt-5 max-w-4xl text-center text-muted-foreground'>
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. Chill for a bit, and try again
        shortly.
      </p>
    </main>
  )
}

export default Page
