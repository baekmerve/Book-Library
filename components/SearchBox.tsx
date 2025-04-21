'use client'
import { SearchIcon } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from './ui/input'
import { useSearchParamsUpdate } from '@/hooks/useSearchParamsUpdate'

const SearchBox = () => {
  const { updateParams, searchParams } = useSearchParamsUpdate()

  const currentGenre = searchParams.get('genre') || ''

  const handleSearch = useDebouncedCallback((searchWord: string) => {
    updateParams({ query: searchWord, genre: currentGenre })
  }, 300)

  return (
    <div className='mt-15 flex flex-col items-center gap-4 md:w-[430px] xl:w-[630px]'>
      <h1 className='text-base md:text-xl uppercase text-white'>
        Discover Your Next Great Read:
      </h1>
      <h1 className='text-center text-2xl md:text-3xl xl:text-4xl font-bold line-clamp-2 w-fit leading-snug text-white'>
        Explore and Search for <span className='text-primary'>Any Book</span> In
        Our Library
      </h1>
      <div
        className='relative mt-10 flex min-h-14 w-full items-center rounded-xl bg-[#343b53] px-4 focus-within:ring-2 focus-within:ring-slate-400
'
      >
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <Input
          type='search'
          className='w-full border-none font-semibold text-sm md:text-base placeholder:font-normal focus-visible:ring-0 text-white placeholder:text-gray-400 placeholder:text-md peer pl-7'
          placeholder='Enter a search keyword'
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
          defaultValue={searchParams.get('query') || ''}
        />

        <SearchIcon
          type='submit'
          className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-6 peer-focus:text-white'
        />
      </div>
    </div>
  )
}

export default SearchBox
