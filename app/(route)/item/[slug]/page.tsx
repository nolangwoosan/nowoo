import Image from 'next/image'
import { notFound } from 'next/navigation'

import supabase from '@/app/_lib/utils/supabase'

export async function generateStaticParams() {
  const { data: items } = await supabase.from('items').select().limit(9)

  if (!items) return []

  return items?.map(({ maple_item_id }) => ({
    slug: maple_item_id?.toString() ?? '',
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

  const { data: item } = await supabase.from('items').select().eq('maple_item_id', slug).single()

  if (!item) return notFound()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-sm:p-4'>
      <Image
        className='aspect-square object-contain'
        src={`https://maplestory.io/api/gms/62/item/${item.maple_item_id}/icon?resize=3`}
        width={80}
        height={80}
        alt={item.name_kor ?? 'No Name'}
      />
      <h1>{item.name_kor}</h1>
      <p>Item Id: {item.maple_item_id}</p>
    </section>
  )
}
