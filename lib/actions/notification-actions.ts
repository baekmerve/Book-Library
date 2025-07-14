'use server'

import { db } from '@/database/drizzle'
import { books, notifications } from '@/database/schema'
import { desc, eq, } from 'drizzle-orm'

export const createNotification = async ({
  userId,
  bookId,
  type,
  message,
}: {
  userId: string
  bookId?: string
  type: 'BORROWED' | 'RETURNED' | 'DUE_SOON' | 'EXPIRED'
  message: string
}) => {
  await db.insert(notifications).values({
    userId,
    bookId: bookId ?? null,
    notificationType: type,
    message,
    isRead: false,
    createdAt: new Date(),
  })
}

export const getNotifications = async (userId: string) => {
  return await db
    .select({
      id: notifications.id,
      userId: notifications.userId,
      bookId: notifications.bookId,
      type: notifications.notificationType,
      message: notifications.message,
      isRead: notifications.isRead,
      createdAt: notifications.createdAt,
      bookTitle: books.title,
    })
    .from(notifications)
    .leftJoin(books, eq(notifications.bookId, books.id))
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
}

