import { NextResponse } from 'next/server'
import { borrowBook } from '@/lib/actions/book-actions'

export async function POST(req: Request) {
  try {
    const { userId, bookId } = await req.json()

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: 'Missing userId or bookId' },
        { status: 400 }
      )
    }

    const result = await borrowBook(bookId, userId)

    return NextResponse.json(result)
  } catch (error) {
    console.error('🚨 BorrowBook API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
