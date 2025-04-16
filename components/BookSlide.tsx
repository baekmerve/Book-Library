'use client'

import { Book } from '@/lib/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'
import BookCover from './BookCover'
import Link from 'next/link'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  latestBooks: Book[]
}
const BookSlide = ({ latestBooks }: Props) => {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !bg-primary !opacity-80',
        bulletActiveClass: '!bg-white !opacity-100',
      }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: true,
      }}
      modules={[Autoplay, Pagination]}
      className='w-full px-5 mx-auto'
    >
      {latestBooks.map((book) => (
        <SwiperSlide key={book.id}>
          <div className='w-full h-full mx-auto p-5 flex flex-col-reverse justify-center items-center gap-20 sm:gap-32 xl:flex-row xl:gap-12 py-10'>
            {/* ========== LEFT TEXT INFO ========== */}
            <motion.div
              className='flex flex-col w-full xl:w-1/2 gap-5'
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className='text-5xl font-semibold text-white md:text-7xl text-center xl:text-start'>
                {book.title}
              </h1>
              <div className='mt-7 text-xl text-light-100 space-y-2'>
                <p>
                  By{' '}
                  <span className='font-semibold text-blue-300'>
                    {book.author}
                  </span>
                </p>
                <p>
                  Category:{' '}
                  <span className='font-semibold text-blue-300'>
                    {book.genre}
                  </span>
                </p>
                <p className='flex items-center gap-1'>
                  <Star className='size-5 text-yellow-500 fill-yellow-500' />
                  Rating: {book.rating}/5
                </p>
              </div>

              <Button
                className='mt-4 min-h-14 text-xl w-fit px-10 bg-primary text-dark-100 hover:bg-primary/70 cursor-pointer'
                asChild
              >
                <Link
                  aria-label='Go to Book details'
                  href={`/books/${book.id}`}
                >
                  Go to Book
                </Link>
              </Button>
            </motion.div>

            {/* ========== RIGHT COVER STACK ========== */}

            <motion.div
              className='relative w-full md:w-[40%] xl:w-[35%] flex justify-center items-center'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className='relative'>
                {/* Foreground book */}
                <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  className='w-[200px] h-[280px] md:w-[256px] md:h-[354px] xl:w-[320px] xl:h-[460px] z-10'
                />

                {/* Blurred shadow */}
                <div className='absolute top-4 left-4 md:top-7 md:left-10 rotate-8 opacity-25 z-0'>
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                    className='w-[200px] h-[280px] md:w-[256px] md:h-[354px] xl:w-[320px] xl:h-[460px]'
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BookSlide
