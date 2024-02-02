import Link from 'next/link'

import { MonsterImage } from '@/components/monster-image'
import { ROUTES } from '@/constants/routes'
import supabase from '@/lib/utils/supabase'

export default async function PopularMonsters() {
  const { data: monsters } = await supabase
    .from('monsters')
    .select('id, maple_mob_id, name_kor')
    .filter('name_kor', 'in', '("좀비루팡","드레이크","좀비버섯","파이어보어","라이칸스로프")')
    .limit(5)

  return (
    <div className='flex w-full flex-col gap-8 max-md:gap-4'>
      <span className='text-2xl font-bold'>인기 몬스터</span>
      <div className='flex flex-col gap-4 rounded-sm bg-white p-12 shadow-md max-md:gap-2 max-md:p-4'>
        {monsters?.map((monster) => (
          <Link className='flex items-center gap-8' key={monster.id} href={ROUTES.MONSTER(monster.maple_mob_id)}>
            <MonsterImage
              monsterId={monster.maple_mob_id}
              className='aspect-square object-contain'
              width={60}
              height={60}
              alt={monster.name_kor}
            />
            <span>{monster.name_kor}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
