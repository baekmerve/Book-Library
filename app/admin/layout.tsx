import { auth } from '@/auth'
import AdminHeader from '@/components/admin/AdminHeader'
import Sidebar from '@/components/admin/Sidebar'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session?.user?.id) redirect('/sign-in')

  const isAdmin = await db
    .select({ isAdmin: users.role }) //select only isAdmin under users table
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === 'ADMIN')

  if (!isAdmin) redirect('/')

  return (
    <main className='flex flex-row w-full min-h-screen'>
      <Sidebar session={session} />
      <div className='flex w-[calc(100%-264px)] flex-1 flex-col bg-[#f8f8ff] p-5 xs:p-10'>
        <AdminHeader session={session} />
        {children}
      </div>
    </main>
  )
}

export default Layout
