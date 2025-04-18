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

        rating: params.rating.toFixed(1), //ensures  sending a string with 1 decimal place (as required by numeric(2,1))
      })
      .returning()

    return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) }
  } catch (error) {
    console.error('🚀 - createBok - error:', error)
    return { success: false, message: 'Error creating book' }
  }
}
