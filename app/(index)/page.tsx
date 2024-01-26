import { Suspense } from 'react'

import Logo from '@/components/logo'
import Search from '@/components/search'
import SearchResult from '@/components/search-result'

import PopularItems from './popular-items'
import PopularMonsters from './popular-monsters'

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  return (
    <section className='flex flex-col items-center gap-4 p-24 max-lg:px-4 max-lg:py-16'>
      <Logo />
      <div className='relative flex w-[600px] justify-center max-sm:w-full'>
        <Search query={searchParams?.query || ''} />
        <Suspense>
          <SearchResult searchQuery={searchParams?.query || ''} />
        </Suspense>
      </div>
      <div className='mt-8 flex w-full gap-10 max-lg:flex-col'>
        <Suspense>
          <PopularItems />
          <PopularMonsters />
        </Suspense>
      </div>
    </section>
  )
}
