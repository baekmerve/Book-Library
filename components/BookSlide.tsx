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

interface Props {
  latestBooks: Book[]
}
const BookSlide = ({ latestBooks }: Props) => {
  return (
    <Swiper
      slidesPerView={1}
      loop
      pagination={{
        clickable: true,
        bulletClass:
          'swiper-pagination-bullet !bg-soft-pink !opacity-80 !size-2',
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
          <div className='relative w-full mx-auto px-5 py-14 flex flex-col-reverse justify-center items-center gap-14 sm:gap-20 xl:flex-row xl:gap-12'>
            {/* LEFT GLASS INFO */}
            <div className='backdrop-blur-md bg-white/5 border border-white/10 shadow-md rounded-xl p-10 flex flex-col w-full xl:w-1/2 items-center xl:items-start text-center xl:text-left '>
              <h1 className='text-lg md:text-2xl xl:text-3xl font-semibold text-white'>
                {book.title}
              </h1>
              <div className='mt-6 text-sm md:text-base xl:text-lg text-light-100 space-y-3 md:space-y-5'>
                <p className='text-white'>
                  By <span className='font-semibold '>{book.author}</span>
                </p>
                <p className='text-white'>
                  Category: <span className='font-semibold '>{book.genre}</span>
                </p>
                <p className='flex justify-center xl:justify-start items-center gap-1 text-white rounded-xl w-fit py-3 px-5 bg-dark-100 '>
                  <Star className='size-4 xl:size-5 text-yellow-500 fill-yellow-500' />
                  Rating: {book.rating}/5
                </p>
              </div>

              <Button
                className='mt-6 h-10 md:h-12 text-sm md:text-base w-fit px-4 md:px-10 bg-primary text-dark-100 hover:bg-primary/70 font-poetsen'
                asChild
              >
                <Link href={`/books/${book.id}`}>Go to Book</Link>
              </Button>
            </div>

            {/* RIGHT IMAGE */}
            <div className='relative flex justify-center items-center w-full xl:w-1/2 '>
              <div className='group perspective relative '>
                {/* Blurred Shadow */}
                <div className='absolute -inset-3 md:-inset-10 blur-sm  opacity-40 left-12 md:left-30 rotate-2 rounded-xl z-0'>
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                    priority
                    className='w-[180px] h-[240px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[430px] xl:w-[320px] xl:h-[460px] '
                  />
                </div>

                {/* Foreground Book with 3D tilt */}
                <div className='transform-style preserve-3d transition-transform duration-300 ease-out group-hover:-rotate-y-15 group-hover:-rotate-x-20 '>
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                    priority
                    className='relative z-10 w-[150px] h-[220px] md:w-[230px] md:h-[330px] lg:w-[280px] lg:h-[400px] xl:w-[320px] xl:h-[460px]  '
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BookSlide
