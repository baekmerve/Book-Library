// export interface Book {
//   id: string
//   title: string
//   author: string
//   genre: string
//   rating: number
//   totalCopies: number
//   availableCopies: number
//   description: string
//   coverColor: string
//   coverUrl: string
//   videoUrl: string
//   summary: string
//   createdAt: Date | null
// }

export interface Book {
  // id: string - active when u use database
  id: number
  title: string
  author: string
  genre: string
  rating: number
  total_copies: number
  available_copies: number
  description: string
  color: string
  cover: string
  video: string
  summary: string
  isLoanedBook?: boolean
}

export interface AuthCredentials {
  fullName: string
  email: string
  password: string
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
  videoUrl: string
  summary: string
}

export interface BorrowBookParams {
  bookId: string
  userId: string
}

export type BookCoverVariant =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'regular'
  | 'wide'

export type BookCoverType = {
  variant?: BookCoverVariant
  className?: string
  coverColor: string
  coverImage: string
}
