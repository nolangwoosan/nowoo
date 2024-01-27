import Image from 'next/image'
import { notFound } from 'next/navigation'

import Logo from '@/components/logo'
import SearchForm from '@/components/search-form'
import { getItemImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = params

  const { data: item } = await supabase
    .from('items')
    .select(
      'id, maple_item_id, name_kor, name_eng, category, sub_category, overall_category, req_level, req_str, req_dex, req_int, req_luk, req_pop, price_shop, upgradable_count'
    )
    .match({ maple_item_id: slug })
    .single()

  if (!item) return notFound()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-sm:px-4 max-sm:py-16'>
      <Logo />
      <SearchForm />
      <div className='mt-8 flex w-[500px] max-w-full flex-col bg-[#06062C] bg-opacity-50 px-2 pb-20 text-white shadow-md'>
        <div className='mt-5 flex w-full flex-col items-center gap-1 p-2'>
          <h1 className='text-3xl font-semibold'>{item.name_kor}</h1>
        </div>

        <div className='flex gap-10 px-4 py-4'>
          <div className='h-fit bg-white bg-opacity-30 p-2'>
            <Image
              className='aspect-square object-contain'
              src={getItemImage(item.maple_item_id ?? 0)}
              width={100}
              height={100}
              alt={item.name_kor ?? 'No Name'}
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm'>REQ LEV: {item.req_level ?? 0}</span>
            <span className='text-sm'>REQ STR: {item.req_str ?? 0}</span>
            <span className='text-sm'>REQ DEX: {item.req_dex ?? 0}</span>
            <span className='text-sm'>REQ INT: {item.req_int ?? 0}</span>
            <span className='text-sm'>REQ LUK: {item.req_luk ?? 0}</span>
            <span className='text-sm'>REQ POP: {item.req_pop ?? 0}</span>
          </div>
        </div>

        <div className='mb-2 flex justify-center gap-10 border-b-2 border-b-white pb-2 max-md:gap-4'>
          <span className='text-lg'>초보자</span>
          <span className='text-lg'>전사</span>
          <span className='text-lg'>마법사</span>
          <span className='text-lg'>궁수</span>
          <span className='text-lg'>도적</span>
        </div>

        <div className='flex flex-col gap-10 px-4'>
          <div className='flex flex-col gap-1'>
            <span>옵션 힘: +2 (1~3)</span>
            <span>옵션 물리방어력: +16 (14~18)</span>
            <span>업그레이드 가능 횟수: {item.upgradable_count ?? 0}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span>상점 거래가: {item.price_shop ?? 0} 메소</span>
            <span>거래 시세가: {item.price_shop ?? 0} 메소</span>
          </div>
        </div>
      </div>
    </section>
  )
}
