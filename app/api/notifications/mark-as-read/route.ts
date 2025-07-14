import { auth } from '@/auth'
import { db } from '@/database/drizzle'
import { notifications } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.userId, userId))

  return NextResponse.json({ success: true })
}
