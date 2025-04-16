import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
