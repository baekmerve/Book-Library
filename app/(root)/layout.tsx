import { auth } from '@/auth'
import Header from '@/components/Header'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  if (!session) redirect('/sign-in')

  //update user's last active date when they visit the website
  after(async () => {
    if (!session?.user?.id) return

    //get user and see if the last activity is today
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1)

    // if user not found, do nothing
    if (!user) return

    // if the user's last activity date is today then don't update it
    const lastActivity = user.lastActivityDate
    const today = new Date().toISOString().slice(0, 10)
    if (lastActivity === today) return

    // update lastActivityDate
    await db
      .update(users)
      .set({ lastActivityDate: today })
      .where(eq(users.id, session.user.id))
  })

  return (
    <main className='root-container'>
      <Header />
      <div className='mt-40 pb-20 w-5/6 mx-auto'>{children}</div>
    </main>
  )
}

export default Layout
