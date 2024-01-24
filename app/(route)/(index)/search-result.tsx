import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/app/_constants/routes'
import { Tables } from '@/app/_types/supabase'

import { getItemImage, getMonsterImage } from './utils'

interface Props {
  items: Tables<'items'>[]
  monsters: Tables<'monsters'>[]
}

export default async function SearchResult({ items, monsters }: Readonly<Props>) {
  if (!items.length && !monsters.length) return null

  return (
    <div className='absolute top-full z-10 min-h-8 w-full rounded-b-[30px] bg-white shadow-md'>
      {items.length > 0 && (
        <div className='flex flex-col gap-4 py-8'>
          <div className='text-center text-2xl font-bold text-gray-600'>아이템</div>
          <div className='flex flex-col'>
            {items.map((item) => (
              <Link
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={item.maple_item_id ? ROUTES.ITEM(item.maple_item_id) : ROUTES.HOME}
                key={item.id}
              >
                <Image
                  className='aspect-square object-contain'
                  src={getItemImage(item.maple_item_id ?? 0)}
                  width={48}
                  height={48}
                  alt={item.name_kor ?? ''}
                />
                <span>{item.name_kor}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {monsters.length > 0 && (
        <div className='flex flex-col gap-4'>
          <div className='text-center text-2xl font-bold text-gray-600'>몬스터</div>
          <div className='flex flex-col'>
            {monsters.map((monster) => (
              <Link
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={monster.maple_mob_id ? ROUTES.MONSTER(monster.maple_mob_id) : ROUTES.HOME}
                key={monster.id}
              >
                <Image
                  className='aspect-square object-contain'
                  src={getMonsterImage(monster.maple_mob_id ?? 0)}
                  width={48}
                  height={48}
                  alt={monster.name_kor ?? ''}
                />
                <span>{monster.name_kor}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
