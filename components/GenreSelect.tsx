'use client'
import { useSearchParamsUpdate } from '@/hooks/useSearchParamsUpdate'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const GenreSelect = () => {
  const { updateParams, searchParams } = useSearchParamsUpdate()

  const currentQuery = searchParams.get('query') || ''
  const selectedGenre = searchParams.get('genre') || 'All'

  const handleChange = (genre: string) => {
    const selectedGenre = genre === 'All' ? '' : genre
    updateParams({ genre: selectedGenre, query: currentQuery })
  }
  return (
    <Select value={selectedGenre} onValueChange={handleChange}>
      <SelectTrigger className='w-[180px] xl:self-end text-primary'>
        <SelectValue
          placeholder='Select a genre'
          className='placeholder:text-white'
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='All'>All</SelectItem>
          <SelectItem value='Fantasy'>Fantasy</SelectItem>
          <SelectItem value='Development'>Development</SelectItem>
          <SelectItem value='Fiction'>Fiction</SelectItem>
          <SelectItem value='History'>History</SelectItem>
          <SelectItem value='Romance'>Romance</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default GenreSelect
