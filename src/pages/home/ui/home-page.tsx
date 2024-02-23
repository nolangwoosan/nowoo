import { Suspense } from 'react'

import PopularItems from './popular-items'
import PopularMonsters from './popular-monsters'
import { PopularSkeletonUI } from './popular-skeleton-ui'

export function HomePage() {
  return (
    <div className='mt-24 flex w-full gap-10 max-lg:flex-col'>
      {/* <AccessLogger /> */}
      <Suspense fallback={<PopularSkeletonUI title='다른 유저들이 선호하는 아이템' />}>
        <PopularItems />
      </Suspense>
      <Suspense fallback={<PopularSkeletonUI title='인기 몬스터' />}>
        <PopularMonsters />
      </Suspense>
    </div>
  )
}
