import Image from 'next/image'
import { notFound } from 'next/navigation'

import Logo from '@/components/logo'
import { Menu } from '@/components/menu'
import SearchForm from '@/components/search-form'
import { getMonsterImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = params

  const { data: monster } = await supabase
    .from('monsters')
    .select(
      'id, maple_mob_id, name_kor, name_eng, level, hp, mp, exp, ph_attack, mg_attack, ph_defence, mg_defence, description_kor, is_undead'
    )
    .match({ maple_mob_id: slug })
    .single()

  if (!monster) return notFound()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-lg:px-4 max-lg:py-16'>
      <Logo />
      <Menu />
      <SearchForm />
      <div className='mt-24 flex w-[500px] max-w-full flex-col bg-[#06062C] bg-opacity-50 px-2 pb-20 text-white shadow-md'>
        <div className='mt-5 flex w-full flex-col items-center gap-1 p-2'>
          <h1 className='text-3xl font-semibold'>{monster.name_kor}</h1>
        </div>

        <div className='flex gap-10 px-4 py-4'>
          <div className='h-fit bg-white p-2'>
            <Image
              className='aspect-square object-contain'
              src={getMonsterImage(monster.maple_mob_id)}
              width={160}
              height={160}
              alt={monster.name_kor}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span>LEV: {monster.level}</span>
            <div className='flex flex-col gap-1'>
              <span className='text-[#FF3B3B]'>HP {monster.hp}</span>
              <div className='h-[10px] w-[200px] bg-[#FF3B3B]' />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[#1B69FF]'>MP {monster.mp}</span>
              <div className='h-[10px] w-[200px] bg-[#1B69FF]' />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[#DFDFDF]'>EXP {monster.exp}</span>
              <div className='h-[10px] w-[200px] bg-[#DFDFDF]' />
            </div>
          </div>
        </div>

        <div className='mx-4 bg-[#c2c2d1] bg-opacity-20'>
          <div className='flex border-b border-[#BBB]'>
            <div className='flex-1 border-r border-[#BBB] text-center'>공격력</div>
            <div className='flex-1 text-center'>방어력</div>
          </div>
          <div className='flex'>
            <div className='grid flex-1 grid-cols-2 justify-between border-r border-[#BBB]'>
              <span className='flex-1 text-center'>물리</span>
              <span className='flex-1 text-center'>마법</span>
              <span className='flex-1 text-center'>{monster.ph_attack}</span>
              <span className='flex-1 text-center'>{monster.mg_attack}</span>
            </div>
            <div className='grid flex-1 grid-cols-2 justify-between'>
              <span className='flex-1 text-center'>물리</span>
              <span className='flex-1 text-center'>마법</span>
              <span className='flex-1 text-center'>{monster.ph_defence}</span>
              <span className='flex-1 text-center'>{monster.mg_defence}</span>
            </div>
          </div>
        </div>

        <div className='mt-4 flex flex-col gap-1 border-t-2 border-white px-4 pt-4'>
          {/* <span>드랍율: 0.008%</span> */}
          {/* <span>요구 명중률: </span> */}
          {/* <span>내 레벨을 고려한 요구명중률: 160</span> */}
          {/* <span>회피율: </span> */}
          <span>언데드 여부: {monster.is_undead ? 'O' : 'X'}</span>
          {/* <span>MP 회복: </span> */}
        </div>
      </div>
    </section>
  )
}
