'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense, useCallback, useRef, useState } from 'react'

import { ROUTES } from '@/shared/routes'
import { cn } from '@/shared/tailwind-merge'

import { useDebounce, useOutsideClick } from '@/shared/hooks'
import { SearchResult } from './search-result'
import { SearchResultSkeletonUI } from './search-result-skeleton-ui'

export interface Items {
  data: {
    itemIdx: number
    mapleItemId: number
    nameKor: string
  }[]
}

export interface Monsters {
  data: {
    monsterIdx: number
    mapleMobId: number
    nameKor: string
  }[]
}

export function SearchForm() {
  const router = useRouter()

  const searchFormRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 250)
  const [isFocused, setIsFocused] = useState(false)
  const [firstSearchResult, setFirstSearchResult] = useState<Items['data'][0] | Monsters['data'][0] | null>(null)

  const onCheckFirstSearchResult = (items: Items['data'], monsters: Monsters['data']) => {
    if (items.length > 0) {
      setFirstSearchResult(items[0])
      return
    }

    if (monsters.length > 0) {
      setFirstSearchResult(monsters[0])
      return
    }

    setFirstSearchResult(null)
  }

  const handleEnterKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (firstSearchResult) {
          if ('mapleItemId' in firstSearchResult) {
            router.push(ROUTES.ITEM(firstSearchResult.mapleItemId))
            return
          }

          if ('mapleMobId' in firstSearchResult) {
            router.push(ROUTES.MONSTER(firstSearchResult.mapleMobId))
            return
          }
        }
      }
    },
    [firstSearchResult, router]
  )

  useOutsideClick({ ref: searchFormRef, handler: () => setIsFocused(false) })

  return (
    <div className='relative w-[500px] max-md:w-full max-md:max-w-[500px]'>
      <div
        className='absolute top-0 flex w-full flex-col justify-center rounded-[30px] bg-white'
        ref={searchFormRef}
        onFocus={() => setIsFocused(true)}
      >
        <div className={cn('flex w-full items-center gap-4 px-8 py-4 max-md:px-4')}>
          <input
            className='flex-1 border-none p-0 focus:border-transparent focus:ring-0'
            type='text'
            placeholder='아이템 or 몬스터 이름'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyDown={handleEnterKey}
          />
          <Search />
        </div>

        {isFocused && Boolean(debouncedSearchValue) && (
          <Suspense fallback={<SearchResultSkeletonUI />}>
            <SearchResult searchValue={debouncedSearchValue} onCheckFirstSearchResult={onCheckFirstSearchResult} />
          </Suspense>
        )}
      </div>
    </div>
  )
}
