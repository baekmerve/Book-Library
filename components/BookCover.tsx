import { cn } from '@/lib/utils'
import BookCoverSvg from './BookCoverSvg'
import Image from 'next/image'

interface Props {
  className?: string
  coverColor: string
  coverImage: string
  priority?: boolean 
}

const BookCover = ({
  className,
  coverColor = '#012B48',
  coverImage = 'https://placehold.co/400x600.png',
  priority = false,
}: Props) => {
  return (
    <div
      className={cn(
        'relative transition-all duration-300  rounded ',
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className='absolute z-10'
        style={{ left: '12%', width: '87.5%', height: '87%' }}
      >
        <Image
          src={coverImage}
          alt='Default book cover image'
          fill
          className='rounded-sm object-cover'
          loading={priority ? undefined : 'lazy'}
          priority={priority}
        />
      </div>
    </div>
  )
}
export default BookCover
