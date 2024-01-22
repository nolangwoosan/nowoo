import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/app/_constants/routes'
import supabase from '@/app/_lib/utils/supabase'

export default async function Home() {
  const { data: monsters } = await supabase.from('monsters').select().limit(9)
  const { data: items } = await supabase.from('items').select().limit(9)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h2 className='mb-8 text-4xl font-bold'>몬스터</h2>
      <div className='grid w-full grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
        {monsters?.map((monster) => (
          <Link
            href={monster.maple_mob_id ? ROUTES.MONSTER(monster.maple_mob_id.toString()) : ROUTES.HOME}
            key={monster.id}
            className='flex flex-col items-center gap-1 rounded-xl bg-gray-100 p-4 shadow-xl
          '
          >
            <Image
              className='max-h-20 min-h-20  min-w-20 max-w-20 object-contain'
              src={`https://maplestory.io/api/gms/62/mob/animated/${monster.maple_mob_id}/move`}
              width={80}
              height={80}
              alt={monster.name_kor ?? 'No Name'}
            />
            <h1 className='text-2xl font-bold'>{monster.name_kor}</h1>
            <span>Level: {monster.level}</span>
            <span>HP: {monster.hp}</span>
            <p className='mt-4 line-clamp-4 text-xs'>{monster.description_kor}</p>
          </Link>
        ))}
      </div>
      <h2 className='mb-8 mt-16 text-4xl font-bold'>아이템</h2>
      <div className='grid w-full grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
        {items?.map((item) => (
          <Link
            href={item.maple_item_id ? ROUTES.ITEM(item.maple_item_id.toString()) : ROUTES.HOME}
            key={item.id}
            className='flex flex-col items-center gap-1 rounded-xl bg-gray-100 p-4 shadow-xl
          '
          >
            <Image
              className='max-h-20 min-h-20  min-w-20 max-w-20 object-contain'
              src={`https://maplestory.io/api/gms/62/item/${item.maple_item_id}/icon?resize=3`}
              width={80}
              height={80}
              alt={item.name_kor ?? 'No Name'}
            />
            <h1 className='text-2xl font-bold'>{item.name_kor}</h1>
            <span>category: {item.category}</span>
            <span>sub_category: {item.sub_category}</span>
            <p className='mt-4 line-clamp-4 text-xs'>{item.description_eng}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
