import Image from 'next/image'
import { notFound } from 'next/navigation'

import Logo from '@/components/logo'
import { Menu } from '@/components/menu'
import SearchForm from '@/components/search-form'
import { cn, getItemImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

interface Props {
  params: {
    slug: string
  }
}

const JOB: Record<number, string[]> = {
  0: ['초보자'],
  1: ['전사'],
  2: ['마법사'],
  3: ['전사', '마법사'],
  4: ['궁수'],
  8: ['도적'],
  9: ['전사', '도적'],
} as const

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = params

  const { data: item } = await supabase.from('items').select().match({ maple_item_id: slug }).single()

  if (!item) return notFound()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-lg:px-4 max-lg:py-16'>
      <Logo />
      <Menu />
      <SearchForm />
      <div className='mt-24 flex w-[500px] max-w-full flex-col bg-[#06062C] bg-opacity-50 px-2 pb-20 text-white shadow-md'>
        <div className='mt-5 flex w-full flex-col items-center gap-1 p-2'>
          <h1 className='text-3xl font-semibold'>{item.name_kor}</h1>
        </div>

        <div className='flex gap-10 px-4 py-4'>
          <div className='h-fit bg-white bg-opacity-30 p-2'>
            <Image
              className='aspect-square object-contain'
              src={getItemImage(item.maple_item_id)}
              width={100}
              height={100}
              alt={item.name_kor}
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm'>REQ LEV: {item.req_level}</span>
            <span className='text-sm'>REQ STR: {item.req_str}</span>
            <span className='text-sm'>REQ DEX: {item.req_dex}</span>
            <span className='text-sm'>REQ INT: {item.req_int}</span>
            <span className='text-sm'>REQ LUK: {item.req_luk}</span>
            <span className='text-sm'>REQ POP: {item.req_pop}</span>
          </div>
        </div>

        <div className='mb-2 flex justify-center gap-10 border-b-2 border-b-white pb-2 max-md:gap-4'>
          {['초보자', '전사', '마법사', '궁수', '도적'].map((job) => (
            <span key={job} className={cn('text-lg', JOB[item.req_job].includes(job) ? '' : 'text-red-500')}>
              {job}
            </span>
          ))}
        </div>

        <div className='flex flex-col gap-10 px-4'>
          <div className='flex flex-col gap-1'>
            {Boolean(item.inc_ph_attack) && <span>물리공격력: +{item.inc_ph_attack}</span>}
            {Boolean(item.inc_mg_attack) && <span>마법공격력: +{item.inc_mg_attack}</span>}
            {Boolean(item.inc_ph_defence) && <span>물리방어력: +{item.inc_ph_defence}</span>}
            {Boolean(item.inc_mg_defence) && <span>마법방어력: +{item.inc_mg_defence}</span>}
            {Boolean(item.inc_str) && <span>STR: +{item.inc_str}</span>}
            {Boolean(item.inc_dex) && <span>DEX: +{item.inc_dex}</span>}
            {Boolean(item.inc_int) && <span>INT: +{item.inc_int}</span>}
            {Boolean(item.inc_luk) && <span>LUK: +{item.inc_luk}</span>}
            {Boolean(item.inc_hp) && <span>HP: +{item.inc_hp}</span>}
            {Boolean(item.inc_mp) && <span>MP: +{item.inc_mp}</span>}
            <span>업그레이드 가능 횟수: {item.upgradable_count}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span>상점 거래가: {item.price_shop} 메소</span>
            {/* <span>거래 시세가: {item.price_shop} 메소</span> */}
          </div>
        </div>
      </div>
    </section>
  )
}
