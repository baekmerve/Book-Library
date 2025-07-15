'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNotificationStore } from '@/lib/stores/notificationStore'

interface Props {
  bookId: string
  userId: string
  availableToBorrow?: boolean
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
  buttonText,
  loadingText,
  redirectPath,
  className,
  variant = 'borrow',
}: Props) => {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  )

  const onClick = async () => {
    if (variant === 'borrow' && !availableToBorrow) {
      toast.error(
        'All books are currently borrowed. Please wait until they are returned and try again.'
      )
      return
    }

    setIsProcessing(true)

    try {
      const endpoint =
        variant === 'borrow' ? '/api/books/borrow' : '/api/books/return'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, userId }),
      })

      const result = await res.json()

      if (result.success) {
        toast.success(
          variant === 'borrow'
            ? 'Book borrowed successfully'
            : 'Book returned successfully'
        )
        await fetchNotifications()

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
      className={` h-10 md:h-12 w-fit cursor-pointer ${className}`}
    >
      <p className='font-poetsen text-sm md:text-base'>
        {isProcessing ? loadingText : buttonText}
      </p>
    </Button>
  )
}

export default BookActionButton
