'use client'

import { Suspense, useState } from 'react'

import { Tables } from '@/app/_types/supabase'

import SearchBar from './search-bar'
import SearchResult from './search-result'

interface Props {
  items: Tables<'items'>[] | null
}

export default function Search({ items }: Readonly<Props>) {
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchValue = (value: string) => {
    setSearchValue(value)
  }

  return (
    <div className='relative'>
      <SearchBar
        isItemExist={searchValue ? items?.some((item) => item.name_kor?.includes(searchValue)) ?? false : false}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
      <Suspense>
        <SearchResult
          items={searchValue ? items?.filter((item) => item.name_kor?.includes(searchValue)).slice(0, 5) ?? [] : []}
        />
      </Suspense>
    </div>
  )
}
