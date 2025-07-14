import { db } from '@/database/drizzle'
import { borrowRecords } from '@/database/schema'
import { createNotification } from '@/lib/server/notification'
import { eq } from 'drizzle-orm'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'

export async function GET() {
  const today = dayjs()

  const active = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.status, 'BORROWED'))

  for (const r of active) {
    const due = dayjs(r.dueDate)

    if (due.diff(today, 'day') === 1) {
      await createNotification({
        userId: r.userId,
        bookId: r.bookId,
        type: 'DUE_SOON',
        message: `Your book is due tomorrow. Please return it on time.`,
      })
    }

    if (due.isBefore(today)) {
      await createNotification({
        userId: r.userId,
        bookId: r.bookId,
        type: 'EXPIRED',
        message: `Your book return is overdue!`,
      })
    }
  }

  return NextResponse.json({ success: true, checked: active.length })
}
