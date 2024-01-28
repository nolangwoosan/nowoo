'use client'

import { useQueries } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useRef, useState } from 'react'

import { useDebounce } from '@/lib/hooks/use-debounce'
import { useOutsideClick } from '@/lib/hooks/use-outside-click'
import { cn } from '@/lib/utils'

import SearchResult from './search-result'

const QUERY_KEYS = {
  items: (query: string) => ['items', { query }],
  monsters: (query: string) => ['monsters', { query }],
}

export default function SearchForm() {
  const searchFormRef = useRef<HTMLDivElement>(null)
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

  useOutsideClick({ ref: searchFormRef, handler: () => setIsFocused(false) })

  return (
    <div
      className='absolute top-60 flex w-[500px] flex-col justify-center max-lg:top-52 max-md:w-full max-md:px-4'
      ref={searchFormRef}
      onFocus={() => setIsFocused(true)}
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
        <div className='max-h-96 min-h-8 w-full overflow-y-auto rounded-b-[30px] bg-white shadow-md'>
          <SearchResult items={itemsQuery.data?.data ?? []} monsters={monstersQuery.data?.data ?? []} />
        </div>
      )}
    </div>
  )
}
