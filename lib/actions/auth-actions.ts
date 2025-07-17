'use server'
import { db } from '@/database/drizzle'
import { AuthCredentials, UserAccountType } from './../types'
import { books, borrowRecords, users } from '@/database/schema'
import { desc, eq } from 'drizzle-orm'
import { signIn, signOut } from '@/auth'
import { hash } from 'bcryptjs'

//function to login
export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    //result can be null, to control the case
    if (!result) {
      return { success: false, error: 'Unexpected error occurred' }
    }
    if (result?.error) {
      return { success: false, error: result.error }
    }

    return { success: true }
  } catch (error) {
    console.error('🚀 - signInWithCredentials - error:', error)
    return { success: false, error: 'Password or email is incorrect' }
  }
}

//function to register
export const signUp = async (params: AuthCredentials) => {
  const { fullName, password, email } = params

  //check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  //if the user already exists
  if (existingUser.length > 0) {
    return { success: false, error: 'User already exists' }
  }

  //hash the password
  const hashedPassword = await hash(password, 10)

  //if the user does not exist then add user to db
  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
    })

    //automatically sign in the user
    const signInResult = await signInWithCredentials({ email, password })

    if (!signInResult.success) {
      return {
        success: false,
        error: 'Registeration successful, but sign-in failed',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('🚀 - signUp - error:', error)
    return {
      success: false,
      error: 'Unexpected sign-up error occurred please try again',
    }
  }
}

//function to logout
export const logout = async () => {
  await signOut()
}

//function to get account details
export const getAccountDetails = async (
  userId: string
): Promise<UserAccountType> => {
  // 1. Get user details
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  // Ensure that the user is not null
  if (!user) {
    throw new Error('User not found')
  }

  // 2. Get all borrow records for the user (with book info)
  const rawBorrowRecords = await db
    .select({
      borrowRecord: {
        id: borrowRecords.id,
        userId: borrowRecords.userId,
        bookId: borrowRecords.bookId,
        borrowDate: borrowRecords.borrowDate,
        dueDate: borrowRecords.dueDate,
        returnDate: borrowRecords.returnDate,
        status: borrowRecords.status,
      },
      book: {
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        rating: books.rating,
        totalCopies: books.totalCopies,
        availableCopies: books.availableCopies,
        description: books.description,
        summary: books.summary,
        createdAt: books.createdAt,
      },
    })

    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId))
    .orderBy(desc(borrowRecords.borrowDate)) // Important for picking latest return

  // 3. Get the latest return for each book and filter out duplicates
  const seenReturnedBookIds = new Set<string>()

  const filteredRecords = rawBorrowRecords.filter((record) => {
    const status = record.borrowRecord.status
    const bookId = record.borrowRecord.bookId

    // Keep all non-returned records (BORROWED, OVERDUE etc.)
    if (status !== 'RETURNED') return true

    //if the record is returned and the book id is in the set, skip it
    if (seenReturnedBookIds.has(bookId)) return false

    // if it's the latest return for this book, include it to set
    seenReturnedBookIds.add(bookId)
    return true
  })

  // 4.  Convert rating string to → number
  const transformedRecords = filteredRecords.map((record) => ({
    ...record,
    book: record.book
      ? {
          ...record.book,
          // rating: parseFloat(record.book.rating as unknown as string),
          rating: Number(record.book.rating ?? 0),
        }
      : undefined,
  }))
  // 5. return user info and borrow records
  return {
    ...user,
    borrowRecords: transformedRecords,
  }
}
