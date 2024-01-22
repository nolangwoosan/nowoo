import Image from 'next/image'

import supabase from '@/app/_lib/utils/supabase'

export async function generateStaticParams() {
  const { data: monsters } = await supabase.from('monsters').select().limit(9)

  if (!monsters) return []

  return monsters?.map(({ maple_mob_id }) => ({
    slug: maple_mob_id?.toString() ?? '',
  }))
}

export default async function Page({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const { slug } = params

  const { data: monster } = await supabase.from('monsters').select().eq('maple_mob_id', slug).single()

  if (!monster) return null

  return (
    <main className='flex h-screen flex-col items-center justify-center gap-1'>
      <Image
        className='max-h-20 min-h-20  min-w-20 max-w-20 object-contain'
        src={`https://maplestory.io/api/gms/62/mob/animated/${monster.maple_mob_id}/move`}
        width={80}
        height={80}
        alt={monster.name_kor ?? 'No Name'}
      />
      <h1>{monster.name_kor}</h1>
      <p>Level: {monster.level}</p>
    </main>
  )
}
