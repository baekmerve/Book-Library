import { db } from '@/database/drizzle'
import { borrowRecords, users } from '@/database/schema'
import { eq } from 'drizzle-orm'

type BorrowState = 'reminding' | 'non-reminding' | 'returned' | 'overdue'

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// show borrow confirmation notification

// 3. on day Day 7 check-return-state and show the notification again
// 4. on day Day 14 check-return-state and show
