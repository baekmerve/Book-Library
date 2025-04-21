'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useSearchParamsUpdate() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const updateParams = ({
    query,
    genre,
  }: {
    query?: string
    genre?: string
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    if (query !== undefined) {
      if (query) {
        params.set('query', query)
      } else {
        params.delete('query')
      }
    }

    if (genre !== undefined) {
      if (genre && genre !== 'All') {
        params.set('genre', genre)
      } else {
        params.delete('genre')
      }
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return { updateParams, searchParams }
}
