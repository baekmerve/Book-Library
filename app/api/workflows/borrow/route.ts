import { serve } from '@upstash/workflow/nextjs'
import { db } from '@/database/drizzle'
import { borrowRecords, users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { sendEmail } from '@/lib/workflow-client'

type BorrowState = 'reminding' | 'non-reminding' | 'returned' | 'overdue'

type InitialData = {
  userId: string
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

const getUserBorrowState = async (userId: string): Promise<BorrowState> => {
  const record = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, userId))
    .limit(1)

  if (record.length === 0) return 'returned'

  const borrow = record[0]

  // ✅ If the book has been returned, mark it as returned
  if (borrow.returnDate) return 'returned'

  const dueDate = new Date(borrow.dueDate!)
  const now = new Date()
  const timeLeft = dueDate.getTime() - now.getTime()

  if (timeLeft <= ONE_DAY_IN_MS && timeLeft >= 0) {
    return 'reminding' // one day left
  }

  if (timeLeft < 0) {
    return 'overdue'
  }

  return 'non-reminding' // still time left but not yet in reminding period
}

export const getUserInfo = async (userId: string) => {
  const [user] = await db
    .select({
      email: users.email,
      fullName: users.fullName,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  return user
}

export const { POST } = serve<InitialData>(async (context) => {
  const { userId } = context.requestPayload

  const { email, fullName } = await context.run('get-user-info', async () => {
    return await getUserInfo(userId)
  })

  // Send borrow confirmation email
  await context.run('borrow-email', async () => {
    console.log('sending borrow email')
    await sendEmail({
      email,
      subject: 'Congratulations on borrowing a book!',
      message: `Hello ${fullName}! You have successfully borrowed a book`,
    })
  })

  // 2. Wait 6 days
  await context.sleep('wait-for-6-day', 60 * 60 * 24 * 6)

  // 3. Day 7 & 8 checks

  while (true) {
    const state = await context.run('check-return-state', async () => {
      return await getUserBorrowState(userId)
    })

    if (state === 'returned') break // 🛑 Stop if already returned

    if (state === 'reminding') {
      await context.run('send-email-to-remind', async () => {
        await sendEmail({
          email,
          subject: '1 day left to return',
          message: `Hello ${fullName}! Your book is due in 1 day.`,
        })
      })
    }

    if (state === 'overdue') {
      await context.run('send-email-overdue', async () => {
        await sendEmail({
          email,
          subject: 'Overdue Book Alert!',
          message: `Hey ${fullName}, your book is now overdue. Please return it as soon as possible.`,
        })
      })
    }

    await context.sleep('wait-for-1-day', 60 * 60 * 24 * 1) // 💤 Repeat daily
  }
})
