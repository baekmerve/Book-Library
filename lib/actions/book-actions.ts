'use server'

import { db } from '@/database/drizzle'
import { Book, BorrowRecord } from '../types'
import { books, borrowRecords } from '@/database/schema'
import { and, desc, eq, like, not, or, sql } from 'drizzle-orm'
import dayjs from 'dayjs'
import { workflowClient } from '../workflow-client'
import config from '../config'

export interface BorrowBookParams {
  bookId: string
  userId: string
}
export const borrowBook = async (bookId: string, userId: string) => {
  try {
    // 1. Check if user already borrowed this book and hasn't returned it
    const existingBorrow = await isBookBorrowed(userId, bookId)

    if (existingBorrow) {
      return {
        success: false,
        error: 'You have already borrowed this book and not returned it yet.',
      }
    }

    // 2. Check availability
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1)

    if (book[0].availableCopies <= 0 || !book.length) {
      return { success: false, error: 'Book is not available for borrowing' }
    }

    // 3. Set due date (7 days from now)
    const dueDate = dayjs().add(7, 'day').toDate().toDateString()

    // 4. Insert borrow record
    const record = await db
      .insert(borrowRecords)
      .values({ userId, bookId, dueDate, status: 'BORROWED' })
      .returning() //can we removed

    // 5. Update available copies
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId))

    // send the borrow confirmation email
    console.log('workflowClient-sending borrow email')
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/borrow`,
      body: {
        userId,
      },
    })

    return { success: true, data: JSON.parse(JSON.stringify(record)) }
  } catch (error) {
    console.error('🚀 - borrowBook - error:', error)
    return {
      success: false,
      error:
        'An error occured while borrowing the book. Please try again later.',
    }
  }
}

export const returnBook = async (bookId: string, userId: string) => {
  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1)

    if (!book.length) {
      return { success: false, error: 'Book not found.' }
    }

    const currentCopies = book[0].availableCopies

    // Set return date
    const returnDate = new Date().toDateString()

    // Update borrow record for that user and book
    const record = await db
      .update(borrowRecords)
      .set({ returnDate, status: 'RETURNED' })
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, 'BORROWED') // only return if it's actually borrowed
        )
      )
      .returning()

    // If no record was updated (nothing matched), return error
    if (!record.length) {
      return { success: false, error: 'No active borrow record found.' }
    }

    // Increment available copies
    await db
      .update(books)
      .set({ availableCopies: currentCopies + 1 })
      .where(eq(books.id, bookId))

    return { success: true, data: JSON.parse(JSON.stringify(record[0])) }
  } catch (error) {
    console.error('🚀 - returnBook - error:', error)
    return {
      success: false,
      error:
        'An error occurred while returning the book. Please try again later.',
    }
  }
}

export const isBookBorrowed = async (
  userId: string,
  bookId: string
): Promise<BorrowRecord | undefined> => {
  const borrowRecord = await db
    .select()
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.bookId, bookId),
        eq(borrowRecords.status, 'BORROWED')
      )
    )
    .limit(1)
  return borrowRecord[0]
}

export const fetchAllBooks = async (): Promise<Book[]> => {
  try {
    const bookList = await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt))
    return bookList
  } catch (error) {
    console.log('🚀 - fetchAllBooks - error:', error)
    throw new Error('Failed to fetch book list.')
  }
}

export const fetchBookById = async (bookId: string): Promise<Book | null> => {
  try {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1)
    return book[0]
  } catch (error) {
    console.log('🚀 - fetchBookById - error:', error)
    throw new Error('Failed to fetch the book.')
  }
}

export const fetchLatestBooks = async (): Promise<Book[]> => {
  try {
    const latestBooks = await db
      .select()
      .from(books)
      .limit(10)
      .orderBy(desc(books.createdAt))

    return latestBooks
  } catch (error) {
    console.log('🚀 - fetchLatestBooks - error:', error)
    throw new Error('Failed to fetch the newly added books.')
  }
}

export const fetchBookByKeyword = async (
  keyword: string
): Promise<Book[] | undefined> => {
  const bookList = await db
    .select()
    .from(books)
    .where(
      or(
        like(sql`LOWER(${books.title})`, `%${keyword.toLowerCase()}%`),
        like(sql`LOWER(${books.author})`, `%${keyword.toLowerCase()}%`),
        like(sql`LOWER(${books.genre})`, `%${keyword.toLowerCase()}%`)
      )
    )
    .orderBy(desc(books.createdAt))

  return bookList
}

export const fetchSimilarBook = async (
  genre: string,
  bookId: string
): Promise<Book[] | undefined> => {
  try {
    const bookList = await db
      .select()
      .from(books)
      .where(
        and(
          like(sql`LOWER(${books.genre})`, `%${genre.toLowerCase()}%`),
          not(eq(books.id, bookId))
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(6)
    return bookList
  } catch (error) {
    console.error('🚀 - error:', error)
    throw new Error('Failed to fetch similar books.')
  }
}
