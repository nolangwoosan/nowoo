import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/app/_constants/routes'

import { getMonsterImage, getMonsters } from './utils'

export default async function PopularMonsters() {
  const monsters = await getMonsters()

  return (
    <div className='flex w-full flex-col gap-8'>
      <span className='text-2xl font-bold'>인기 몬스터</span>
      <div className='flex flex-col gap-4 rounded-sm bg-white p-12 shadow-md max-sm:p-4'>
        {monsters?.slice(0, 5)?.map((monsters) => (
          <Link
            className='flex items-center gap-8'
            key={monsters.id}
            href={monsters.maple_mob_id ? ROUTES.MONSTER(monsters.maple_mob_id) : ROUTES.HOME}
          >
            <Image
              src={getMonsterImage(monsters.maple_mob_id ?? 0)}
              width={60}
              height={60}
              alt={monsters.name_kor ?? ''}
            />
            <span>{monsters.name_kor}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
