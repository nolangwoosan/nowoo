import { Suspense } from 'react'

import Logo from './logo'
import PopularItems from './popular-items'
import PopularMonsters from './popular-monsters'
import Search from './search'
import { getItems, getMonsters } from './utils'

export default async function HomePage() {
  const items = await getItems()
  const monsters = await getMonsters()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-sm:px-4 max-sm:py-16'>
      <Logo />
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
