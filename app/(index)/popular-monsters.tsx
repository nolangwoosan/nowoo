import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

import { getMonsterImage, getMonsters } from './utils'

export default async function PopularMonsters() {
  const monsters = await getMonsters()

  return (
    <div className='flex w-full flex-col gap-8'>
      <span className='text-2xl font-bold'>인기 몬스터</span>
      <div className='flex flex-col gap-4 rounded-sm bg-white p-12 shadow-md max-md:gap-2 max-md:p-4'>
        {monsters.slice(0, 5)?.map((monster) => (
          <Link
            className='flex items-center gap-8'
            key={monster.id}
            href={monster.maple_mob_id ? ROUTES.MONSTER(monster.maple_mob_id) : ROUTES.HOME}
          >
            <Image
              className='aspect-square object-contain'
              src={getMonsterImage(monster.maple_mob_id ?? 0)}
              width={60}
              height={60}
              alt={monster.name_kor ?? ''}
            />
            <span>{monster.name_kor}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
