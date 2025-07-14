import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type NotificationMessageParams = {
  type: 'BORROWED' | 'RETURNED' | 'DUE_SOON' | 'EXPIRED'
  title?: string
  author?: string
  dueDate?: string
}

export const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)

export const remainedDaysUntilDue = (dueDate: string | Date) => {
  const today = dayjs()
  const due = dayjs(dueDate)
  const daysLeft = due.diff(today, 'day')

  return daysLeft
}

export function generateNotificationMessage({
  type,
  title,
  author,
  dueDate,
}: NotificationMessageParams): string {
  switch (type) {
    case 'BORROWED':
      return title && author && dueDate
        ? `You have successfully borrowed "${title}" by ${author}. Please return it by ${dueDate}.`
        : `You have borrowed a book. Please return it by ${dueDate}.`

    case 'RETURNED':
      return title && author
        ? `You successfully returned "${title}" by ${author}". Thank you!`
        : `You successfully returned a book. Thank you!`

    case 'DUE_SOON':
      return title && dueDate
        ? `⏰ Reminder: "${title}" is due soon! Please return it by ${dueDate}.`
        : `⏰ Reminder: Your borrowed book is due soon.`

    case 'EXPIRED':
      return title
        ? `⚠️ Overdue notice: "${title}" is past its due date. Please return it as soon as possible.`
        : `⚠️ One of your borrowed books is overdue.`

    default:
      return 'You have a new notification.'
  }
}
