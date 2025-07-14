import { db } from '@/database/drizzle'
import { borrowRecords } from '@/database/schema'
import { eq } from 'drizzle-orm'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import { createNotification } from '@/lib/actions/notification-actions'

export async function GET() {
  const today = dayjs()

  const active = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.status, 'BORROWED'))

  for (const r of active) {
    const due = dayjs(r.dueDate)

    if (due.diff(today, 'day') === 1) {
      try {
        await createNotification({
          userId: r.userId,
          bookId: r.bookId,
          type: 'DUE_SOON',
          message: `Your book is due tomorrow. Please return it on time.`,
        })
      } catch (error) {
        console.error('Notification creation failed', error)
      }
    }

    if (due.isBefore(today)) {
      try {
        await createNotification({
          userId: r.userId,
          bookId: r.bookId,
          type: 'EXPIRED',
          message: `Your book return is overdue!`,
        })
      } catch (error) {
        console.error('Notification creation failed', error)
      }
    }
  }

  return NextResponse.json({ success: true, checked: active.length })
}
