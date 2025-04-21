import { Book } from '@/lib/types'
import BookCover from './BookCover'
import { Star } from 'lucide-react'

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Book) => {
  return (
    <section className='relative flex flex-col gap-12 xl:flex-row xl:items-start xl:gap-20 bg-gray-800 rounded-3xl p-8 sm:p-14 shadow-xl shadow-black/30 border border-white/10'>
      {/* Left: Book Cover */}
      <div className='w-full xl:w-[35%] flex justify-center relative'>
        <div className='relative'>
          <BookCover
            coverColor={coverColor}
            coverImage={coverUrl}
            className=' w-[200px] h-[300px] md:w-[256px] md:h-[380px] xl:w-[320px] xl:h-[480px] z-10'
          />
          <div className='absolute top-4 left-6 md:left-10 rotate-10 opacity-25 z-0'>
            <BookCover
              coverColor={coverColor}
              coverImage={coverUrl}
              className=' w-[200px] h-[300px] md:w-[256px] md:h-[380px] xl:w-[320px] xl:h-[480px]'
            />
          </div>
        </div>
      </div>

      {/* Right: Book Info */}
      <div className='w-full xl:w-[65%] flex flex-col gap-8 text-light-100'>
        <h1 className='text-2xl md:text-4xl font-bold text-white'>{title}</h1>

        <div className='space-y-2 text-sm md:text-lg'>
          <p>
            <span className='font-semibold text-primary'>Author:</span>{' '}
            <span className='text-white'>{author}</span>
          </p>
          <p>
            <span className='font-semibold text-primary'>Genre:</span>{' '}
            <span className='text-white'>{genre}</span>
          </p>
          <p className='flex  items-center gap-1'>
            <span className='font-semibold text-primary'> Rating:</span>

            <Star className='size-4.5 text-yellow-500 fill-yellow-500' />
            <span className='text-white'> {rating}/5</span>
          </p>
          <p>
            <span className='font-semibold text-primary'>Total Copies:</span>
            <span className='text-white'> {totalCopies}</span>
          </p>
          <p>
            <span className='font-semibold text-primary'>
              Available to Borrow:
            </span>{' '}
            <span className='text-white'>{availableCopies}</span>
          </p>
        </div>

        <div>
          <h3 className='text-xl md:text-2xl font-semibold text-white mb-2'>
            Description
          </h3>
          <p className='text-white text-sm md:text-lg leading-relaxed text-justify whitespace-pre-line'>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default BookOverview
