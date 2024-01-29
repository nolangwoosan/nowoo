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

  const { data: prevAccessLogs } = await supabase
    .from('user_access')
    .select('id')
    .match({ ip, agent: userAgent })
    .gte('updated_dt', new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString())
    .order('updated_dt', { ascending: false })

  const lastAccessLog = prevAccessLogs?.[0]

  if (lastAccessLog?.id) {
    await supabase.from('user_access').upsert({
      id: lastAccessLog.id,
      ip,
      agent: userAgent,
    })
  } else {
    await supabase.from('user_access').insert({
      ip,
      agent: userAgent,
    })
  }

  return (
    <section className='mx-auto flex max-w-7xl flex-col items-center gap-6 p-24 max-lg:px-4'>
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
