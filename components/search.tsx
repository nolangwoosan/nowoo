'use client'

import { Suspense, useState } from 'react'

import { Tables } from '@/@types/supabase'

import SearchBar from './search-bar'
import SearchResult from './search-result'

interface Props {
  items: Tables<'items'>[]
  monsters: Tables<'monsters'>[]
}

export default function Search({ items, monsters }: Readonly<Props>) {
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchValue = (value: string) => {
    setSearchValue(value)
  }

  const searchedItems = items.filter((item) => item.name_kor?.includes(searchValue)).slice(0, 5)
  const searchedMonsters = monsters.filter((monster) => monster.name_kor?.includes(searchValue)).slice(0, 5)

  return (
    <div className='relative flex w-[600px] justify-center max-sm:w-full'>
      <SearchBar
        isItemExist={Boolean(searchValue && (searchedItems.length > 0 || searchedMonsters.length > 0))}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
      <Suspense>
        <SearchResult items={searchValue ? searchedItems : []} monsters={searchValue ? searchedMonsters : []} />
      </Suspense>
    </div>
  )
}
