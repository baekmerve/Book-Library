'use client'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from './ui/input'

const SearchBox = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((searchWord: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchWord) {
      params.set('query', searchWord)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='mt-15 flex flex-col items-center gap-4 md:w-[430px] xl:w-[630px]'>
      <h1 className='text-lg md:text-xl uppercase text-white'>
        Discover Your Next Great Read:
      </h1>
      <h1 className='text-center text-4xl xl:text-[56px] font-bold line-clamp-2 w-fit leading-snug text-white'>
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
          className='w-full border-none font-semibold text-lg placeholder:font-normal focus-visible:ring-0 text-white placeholder:text-gray-400 placeholder:text-base peer pl-7'
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
