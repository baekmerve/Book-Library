'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  bookId: string
  userId: string
  availableToBorrow?: boolean
  handleAction: (
    bookId: string,
    userId: string
  ) => Promise<{ success: boolean; error?: string }>
  buttonText: string
  loadingText: string
  iconSrc?: string
  redirectPath?: string
  className?: string
  variant?: 'borrow' | 'return'
}
const BookActionButton = ({
  bookId,
  userId,
  availableToBorrow = true,
  handleAction,
  buttonText,
  loadingText,
  redirectPath,
  className,
  variant = 'borrow',
}: Props) => {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const onClick = async () => {
    if (variant === 'borrow' && !availableToBorrow) {
      toast.error(
        'All books are currently borrowed. Please wait until they are returned and try again.'
      )
      return
    }

    setIsProcessing(true)

    try {
      const result = await handleAction(bookId, userId)
      if (result.success) {
        toast.success(
          variant === 'borrow'
            ? 'Book borrowed successfully'
            : 'Book returned successfully'
        )
        if (redirectPath) {
          router.push(redirectPath)
        } else {
          router.refresh()
        }
      } else {
        toast.error('Oops!', {
          description: result.error,
        })
      }
    } catch (error) {
      console.error('🚀 - onClick - error:', error)

      toast.error('Oops!', {
        description:
          variant === 'borrow'
            ? 'An error occurred while borrowing the book'
            : 'An error occurred while returning the book',
      })
    } finally {
      setIsProcessing(false)
    }
  }
  return (
    <Button
      onClick={onClick}
      disabled={isProcessing}
      className={`min-h-14 w-full md:w-fit cursor-pointer ${className}`}
    >
      <p className='font-bebas text-lg md:text-2xl'>
        {isProcessing ? loadingText : buttonText}
      </p>
    </Button>
  )
}

export default BookActionButton
