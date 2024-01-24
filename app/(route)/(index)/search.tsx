'use client'

import { Suspense, useState } from 'react'

import { Tables } from '@/app/_types/supabase'

import SearchBar from './search-bar'
import SearchResult from './search-result'
import SearchResultLoader from './search-result-loader'

interface Props {
  items: Tables<'items'>[]
  monsters: Tables<'monsters'>[]
}

export default function Search({ items, monsters }: Readonly<Props>) {
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchValue = (value: string) => {
    setSearchValue(value)
  }

  return (
    <div className='relative flex w-[600px] justify-center max-sm:w-full'>
      <SearchBar
        isItemExist={
          Boolean(searchValue) &&
          (items.some((item) => item.name_kor?.includes(searchValue)) ||
            monsters.some((monster) => monster.name_kor?.includes(searchValue)))
        }
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
      <Suspense fallback={<SearchResultLoader />}>
        <SearchResult
          items={searchValue ? items.filter((item) => item.name_kor?.includes(searchValue)).slice(0, 5) : []}
          monsters={
            searchValue ? monsters.filter((monster) => monster.name_kor?.includes(searchValue)).slice(0, 5) : []
          }
        />
      </Suspense>
    </div>
  )
}
