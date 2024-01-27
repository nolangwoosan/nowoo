'use client'

import { useQueries } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { useDebounce } from '@/lib/hooks/use-debounce'
import { cn } from '@/lib/utils'

import SearchResult from './search-result'

const QUERY_KEYS = {
  items: (query: string) => ['items', { query }],
  monsters: (query: string) => ['monsters', { query }],
}

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 300)

  const [isFocused, setIsFocused] = useState(false)

  const [itemsQuery, monstersQuery] = useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.items(debouncedSearchValue),
        queryFn: () => fetch(`/api/items?query=${debouncedSearchValue}`).then((res) => res.json()),
        enabled: Boolean(debouncedSearchValue),
      },
      {
        queryKey: QUERY_KEYS.monsters(debouncedSearchValue),
        queryFn: () => fetch(`/api/monsters?query=${debouncedSearchValue}`).then((res) => res.json()),
        enabled: Boolean(debouncedSearchValue),
      },
    ],
  })

  return (
    <div
      className='relative flex w-[600px] justify-center max-sm:w-full'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div
        className={cn(
          'flex w-full items-center gap-4 rounded-[30px] bg-white px-8 py-4',
          isFocused &&
            (Boolean(itemsQuery.data?.data?.length) || Boolean(monstersQuery.data?.data?.length)) &&
            'rounded-b-none'
        )}
      >
        <input
          className='flex-1 border-none p-0 focus:border-transparent focus:ring-0'
          type='text'
          placeholder='아이템 or 몬스터 이름'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <Search />
      </div>

      {isFocused && (Boolean(itemsQuery.data?.data?.length) || Boolean(monstersQuery.data?.data?.length)) && (
        <div className='absolute top-full z-10 max-h-96 min-h-8 w-full overflow-y-auto rounded-b-[30px] bg-white shadow-md'>
          <SearchResult items={itemsQuery.data?.data ?? []} monsters={monstersQuery.data?.data ?? []} />
        </div>
      )}
    </div>
  )
}
