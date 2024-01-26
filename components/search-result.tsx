import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import { getItemImage, getMonsterImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

interface Props {
  searchQuery: string
}

export default async function SearchResult({ searchQuery }: Readonly<Props>) {
  const { data: items } = searchQuery
    ? await supabase.from('items').select('id, maple_item_id, name_kor').ilike('name_kor', `%${searchQuery}%`).limit(5)
    : { data: null }
  const { data: monsters } = searchQuery
    ? await supabase
        .from('monsters')
        .select('id, maple_mob_id, name_kor')
        .ilike('name_kor', `%${searchQuery}%`)
        .limit(5)
    : { data: null }

  if (!items?.length && !monsters?.length) return null

  return (
    <div className='absolute top-full z-10 max-h-96 min-h-8 w-full overflow-y-auto rounded-b-[30px] bg-white shadow-md'>
      {items && (
        <div className='flex flex-col gap-4 py-8'>
          <div className='text-center text-2xl font-bold text-gray-600'>아이템</div>
          <div className='flex flex-col'>
            {items?.map((item) => (
              <Link
                key={item.id}
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={item.maple_item_id ? ROUTES.ITEM(item.maple_item_id) : ROUTES.HOME}
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
      {monsters && (
        <div className='flex flex-col gap-4'>
          <div className='text-center text-2xl font-bold text-gray-600'>몬스터</div>
          <div className='flex flex-col'>
            {monsters.map((monster) => (
              <Link
                key={monster.id}
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={monster.maple_mob_id ? ROUTES.MONSTER(monster.maple_mob_id) : ROUTES.HOME}
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
