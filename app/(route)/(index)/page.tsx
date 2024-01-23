'use client'

import Image from 'next/image'

import { Suspense, useState } from 'react'

import PopularItems from './popular-items'
import SearchBar from './search-bar'
import SearchResult from './search-result'
import { getItems } from './utils'

export default function HomePage() {
  getItems()

  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchValue = (value: string) => {
    setSearchValue(value)
  }

  return (
    <section className='flex flex-col items-center gap-4 p-24'>
      <Image
        src='https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/MapleStory%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvTWFwbGVTdG9yeSAxLnBuZyIsImlhdCI6MTcwNTk4MzM3NSwiZXhwIjoxNzM3NTE5Mzc1fQ.ryKJVRp_fwDkheC67P2fMflE4ZC704EyslMGGl2HNVM&t=2024-01-23T04%3A16%3A15.275Z'
        width={500}
        height={180}
        alt=''
      />
      <SearchBar searchValue={searchValue} onChangeSearchValue={onChangeSearchValue}>
        <Suspense>
          <SearchResult searchValue={searchValue} />
        </Suspense>
      </SearchBar>
      <div className='mt-4 h-[200px] w-[1200px] max-w-full bg-white' />
      <div className='mt-8 flex w-full gap-10'>
        <PopularItems />
        <PopularItems />
      </div>
    </section>
  )
}
