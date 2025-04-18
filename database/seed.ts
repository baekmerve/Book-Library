
import dummyBooks2 from '../dummybooks2.json'

import { books } from './schema'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { config } from 'dotenv'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql })

const seed = async () => {
  console.log('starting seed the data')

  try {
    for (const book of dummyBooks2) {
      await db.insert(books).values({
        ...book,
        rating: book.rating.toFixed(1),
      })
    }
    console.log('Data seeded successfully')
  } catch (error) {
    console.error('🚀 Error seeding data:', error)
  }
}

seed()
