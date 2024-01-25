import { Suspense } from 'react'

import Logo from '@/components/logo'
import Search from '@/components/search'
import { getItems, getMonsters } from '@/lib/utils'

import PopularItems from './popular-items'
import PopularMonsters from './popular-monsters'

export default async function HomePage() {
  const items = await getItems()
  const monsters = await getMonsters()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-lg:px-4 max-lg:py-16'>
      <Logo />
      <Search items={items} monsters={monsters} />
      <div className='mt-8 flex w-full gap-10 max-lg:flex-col'>
        <Suspense>
          <PopularItems />
          <PopularMonsters />
        </Suspense>
      </div>
    </section>
  )
}
