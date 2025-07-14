export interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  availableCopies: number
  description: string
  coverColor: string
  coverUrl: string
  summary: string
  createdAt: Date | null
}

export interface BookParams {
  title: string
  author: string
  genre: string
  rating: number
  coverUrl: string
  coverColor: string
  description: string
  totalCopies: number
  summary: string
}

export interface AuthCredentials {
  fullName: string
  email: string
  password: string
}

export interface User {
  id: string
  fullName: string
  email: string
  role: 'ADMIN' | 'USER'
  lastActivityDate: string
  createdAt: Date | null
}

export interface BorrowRecord {
  id: string
  userId: string
  bookId: string
  borrowDate: Date | null
  dueDate: string
  returnDate: string | null
  status: 'BORROWED' | 'RETURNED'
}

export type BorrowedBookType = {
  borrowRecord: BorrowRecord
  book?: Book
}

export type UserAccountType = User & {
  borrowRecords: BorrowedBookType[]
}


export interface NotificationType {
  id: string
  userId: string
  bookId: string | null
  type: 'BORROWED' | 'RETURNED' | 'DUE_SOON' | 'EXPIRED'
  message: string
  isRead: boolean
  createdAt: Date
}


