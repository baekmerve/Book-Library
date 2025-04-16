'use server'

import { db } from '@/database/drizzle'
import { BookParams } from '../types'
import { books } from '@/database/schema'

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning()

    return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) }
  } catch (error) {
    console.error('🚀 - createBok - error:', error)
    return { success: false, message: 'Error creating book' }
  }
}
