import { NextResponse } from 'next/server'
import { getNotifications } from '@/lib/actions/notification-actions'
import { auth } from '@/auth'

export async function GET() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return NextResponse.json([], { status: 401 })

  const notifications = await getNotifications(userId)
  return NextResponse.json(notifications)
}
