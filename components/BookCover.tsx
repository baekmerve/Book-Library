'use client'

import { cn } from '@/lib/utils'
import BookCoverSvg from './BookCoverSvg'
import { IKImage } from 'imagekitio-next'
import config from '@/lib/config'
import Link from 'next/link'

interface Props {
  className?: string
  coverColor: string
  coverImage: string
  id?: string
}

const BookCover = ({
  className,
  coverColor = '#012B48',
  coverImage = 'https://placehold.co/400x600.png',
  id,
}: Props) => {
  return (
    <Link href={`/books/${id}`} aria-label={`${id} book cover`}>
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
          <IKImage
            path={coverImage}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt='Default book cover image'
            fill
            className='rounded-sm object-cover'
            loading='lazy'
            lqip={{ active: true }}
          />
        </div>
      </div>
    </Link>
  )
}
export default BookCover
