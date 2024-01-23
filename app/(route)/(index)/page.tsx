import Image from 'next/image'

import { Suspense } from 'react'

import PopularItems from './popular-items'
import PopularMonsters from './popular-monsters'
import Search from './search'
import { getItems, getMonsters } from './utils'

export default async function HomePage() {
  const items = await getItems()
  const monsters = await getMonsters()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-sm:p-4'>
      <Image
        src='https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/MapleStory%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvTWFwbGVTdG9yeSAxLnBuZyIsImlhdCI6MTcwNTk4MzM3NSwiZXhwIjoxNzM3NTE5Mzc1fQ.ryKJVRp_fwDkheC67P2fMflE4ZC704EyslMGGl2HNVM&t=2024-01-23T04%3A16%3A15.275Z'
        width={500}
        height={180}
        alt=''
      />
      <Search items={items} monsters={monsters} />
      <div className='mt-4 h-[200px] w-[1200px] max-w-full bg-white' />
      <div className='mt-8 flex w-full gap-10 max-sm:flex-col'>
        <Suspense>
          <PopularItems />
          <PopularMonsters />
        </Suspense>
      </div>
    </section>
  )
}
