import Image from 'next/image'
import { notFound } from 'next/navigation'

import Logo from '../../(index)/logo'
import Search from '../../(index)/search'
import { getItems, getMonsters } from '../../(index)/utils'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Readonly<Props>) {
  const items = await getItems()
  const monsters = await getMonsters()

  const { slug } = params

  const monster = monsters.find(({ maple_mob_id }) => maple_mob_id?.toString() === slug)

  if (!monster) return notFound()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-sm:p-4'>
      <Logo />
      <Search items={items} monsters={monsters} />
      <div className='mt-8 flex w-[580px] max-w-full flex-col items-center rounded-md bg-white shadow-md'>
        <div className='mt-5 flex w-full flex-col items-center gap-1 bg-[#FEF9EE] p-2'>
          <span className='text-xl font-semibold'>{monster.name_kor}</span>
          <span className='text-sm'>{monster.name_eng}</span>
        </div>
        <div className='flex flex-col items-center gap-2 p-4'>
          <Image
            className='aspect-square object-contain'
            src={`https://maplestory.io/api/gms/62/mob/animated/${monster.maple_mob_id}/move`}
            width={80}
            height={80}
            alt={monster.name_kor ?? 'No Name'}
          />
          <span className='mt-4 text-[#FB9E48]'>Lv. {monster.level}</span>
          <div className='mt-2 flex flex-col gap-1'>
            <div className='flex items-center'>
              <span className='w-20 text-[#FF3B3B]'>HP {monster.hp}</span>
              <div className='h-[10px] w-[180px] bg-[#FF3B3B]' />
            </div>
            <div className='flex items-center'>
              <span className='w-20 text-[#1B69FF]'>MP {monster.mp}</span>
              <div className='h-[10px] w-[180px] bg-[#1B69FF]' />
            </div>
            <div className='flex items-center'>
              <span className='w-20 text-[#A6AEB7]'>EXP {monster.exp}</span>
              <div className='h-[10px] w-[180px] bg-[#A6AEB7]' />
            </div>
          </div>
          <div className='mt-4 w-[280px] border border-[#E0E0E0]'>
            <div className='flex bg-[#F9F9F9]'>
              <span className='flex-1 text-center'>공격력</span>
              <span className='flex-1 text-center'>방어력</span>
            </div>
            <div className='flex bg-[#D9D9D9]'>
              <span className='flex-1 text-center'>물리</span>
              <span className='flex-1 text-center'>마법</span>
              <span className='flex-1 text-center'>물리</span>
              <span className='flex-1 text-center'>마법</span>
            </div>
            <div className='flex bg-[#F9F9F9]'>
              <span className='flex-1 text-center'>{monster.ph_attack}</span>
              <span className='flex-1 text-center'>{monster.mg_attack}</span>
              <span className='flex-1 text-center'>{monster.ph_defence}</span>
              <span className='flex-1 text-center'>{monster.mg_defence}</span>
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            <span>드랍율: 0.0008%</span>
            <span>요구 명중률: 100%</span>
            <span>내 레벨을 고려한 요구 명중률: 100%</span>
            <span>언데드 여부: 아니오</span>
            <span>MP 회복: 0</span>
          </div>
          <p className='mt-8'>{monster.description_kor}</p>
        </div>
      </div>
    </section>
  )
}
