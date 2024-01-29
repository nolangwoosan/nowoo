import { headers } from 'next/headers'
import { Suspense } from 'react'

import Logo from '@/components/logo'
import { Menu } from '@/components/menu'
import SearchForm from '@/components/search-form'
import supabase from '@/lib/utils/supabase'

import PopularItems from './popular-items'
import PopularMonsters from './popular-monsters'

export default async function HomePage() {
  const header = headers()
  const [ip] = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')
  const userAgent = header.get('user-agent') ?? ''

  await supabase.from('user_access').upsert(
    [
      {
        ip,
        agent: userAgent,
      },
    ],
    {
      onConflict: 'ip',
    }
  )

  return (
    <section className='flex flex-col items-center gap-6 p-24 max-lg:px-4'>
      <Logo />
      <Menu />
      <SearchForm />
      <div className='mt-32 flex w-full gap-10 max-lg:flex-col'>
        <Suspense>
          <PopularItems />
          <PopularMonsters />
        </Suspense>
      </div>
    </section>
  )
}
