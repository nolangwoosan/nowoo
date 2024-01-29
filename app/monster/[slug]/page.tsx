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
    <section className='flex flex-col items-center gap-6 p-24 max-lg:px-4'>
      <Logo />
      <Menu />
      <SearchForm />
      <div className='mt-24 flex w-[500px] max-w-full flex-col bg-[#06062C] bg-opacity-50 p-10 text-white shadow-md max-md:p-4'>
        <div className='flex w-full flex-col items-center gap-1'>
          <h1 className='text-2xl font-semibold'>
            {monster.name_kor} (Lv. {monster.level})
          </h1>
          <div>
            <span>{monster.name_eng}</span>
          </div>
        </div>

        <div className='flex gap-12 px-4 py-4'>
          <div className='h-fit bg-white p-2'>
            <Image
              className='aspect-square object-contain max-md:hidden'
              src={getMonsterImage(monster.maple_mob_id)}
              width={160}
              height={160}
              alt={monster.name_kor}
            />
            <Image
              className='aspect-square object-contain md:hidden'
              src={getMonsterImage(monster.maple_mob_id)}
              width={60}
              height={60}
              alt={monster.name_kor}
            />
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-[#FF3B3B]'>HP : {monster.hp}</span>
              <div className='h-[10px] w-[200px] bg-[#FF3B3B] max-md:w-full' />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[#1B69FF]'>MP : {monster.mp}</span>
              <div className='h-[10px] w-[200px] bg-[#1B69FF] max-md:w-full' />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[#DFDFDF]'>EXP : {monster.exp}</span>
              <div className='h-[10px] w-[200px] bg-[#DFDFDF] max-md:w-full' />
            </div>
          </div>
        </div>

        <div className='mx-4 bg-[#c2c2d1] bg-opacity-25 text-xs'>
          <div className='flex border-b border-[#BBB]'>
            <div className='flex-1 border-r border-[#BBB] p-2 text-center'>공격력</div>
            <div className='flex-1 p-2 text-center'>방어력</div>
          </div>
          <div className='flex'>
            <div className='grid flex-1 grid-cols-2 justify-between border-r border-[#BBB] p-2'>
              <span className='mb-2 flex-1 text-center'>물리</span>
              <span className='mb-2 flex-1 text-center'>마법</span>
              <span className='flex-1 text-center'>{monster.ph_attack}</span>
              <span className='flex-1 text-center'>{monster.mg_attack}</span>
            </div>
            <div className='grid flex-1 grid-cols-2 justify-between p-2'>
              <span className='mb-2 flex-1 text-center'>물리</span>
              <span className='mb-2 flex-1 text-center'>마법</span>
              <span className='flex-1 text-center'>{monster.ph_defence}</span>
              <span className='flex-1 text-center'>{monster.mg_defence}</span>
            </div>
          </div>
        </div>

        {monster.is_undead && (
          <div
            className='mx-auto mt-8 rounded-md border border-red-700 text-center text-sm text-red-700'
            style={{ width: '100px' }}
          >
            Undead
          </div>
        )}
      </div>
    </section>
  )
}
