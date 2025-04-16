'use server'
import { db } from '@/database/drizzle'
import { AuthCredentials, UserAccountType } from './../types'
import { books, borrowRecords, users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { signIn, signOut } from '@/auth'
import { hash } from 'bcryptjs'
import { headers } from 'next/headers'
import ratelimit from '../ratelimit'
import { redirect } from 'next/navigation'
import { workflowClient } from '../workflow-client'
import config from '../config'

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) return redirect('/too-fast')

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      return { success: false, error: result.error }
    }
    return { success: true }
  } catch (error) {
    console.error('🚀 - SignIn - error:', error)
    return { success: false, error: 'Signin error' }
  }
}
export const signUp = async (params: AuthCredentials) => {
  const { fullName, password, email } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) return redirect('/too-fast')

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

  //if the user does not exist then add to db
  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
    })

    //send the welcome email
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    })

    await signInWithCredentials({ email, password })

    return {
      success: true,
    }
  } catch (error) {
    console.error('🚀 - signUp - error:', error)
    return { success: false, error: 'Signup error' }
  }
}

export const logout = async () => {
  await signOut()
}

export const getAccountDetails = async (
  userId: string
): Promise<UserAccountType> => {
  // 1. Get user details
  const user = await db.select().from(users).where(eq(users.id, userId))

  // Ensure that the user is not null
  if (user.length === 0) {
    throw new Error('User not found')
  }

  // 2. Get all borrow records for the user (with book info)
  const borrowRecordsWithBooks = await db
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
        videoUrl: books.videoUrl,
        createdAt: books.createdAt,
      },
    })

    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId))


  return {
    ...user[0],
    borrowRecords: borrowRecordsWithBooks,
  }
}
