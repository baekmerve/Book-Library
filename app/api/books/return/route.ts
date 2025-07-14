import { NextResponse } from 'next/server'
import { returnBook } from '@/lib/actions/book-actions'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, bookId } = body

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: 'Missing userId or bookId' },
        { status: 400 }
      )
    }

    const result = await returnBook(bookId, userId)

    return NextResponse.json(result)
  } catch (error) {
    console.error('🚨 ReturnBook API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
