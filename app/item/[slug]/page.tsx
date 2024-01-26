import Image from 'next/image'
import { notFound } from 'next/navigation'

import Logo from '@/components/logo'
import Search from '@/components/search'
import { getItemImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

interface Props {
  params: {
    slug: string
  }
  searchParams?: {
    query?: string
  }
}

export default async function Page({ params, searchParams }: Readonly<Props>) {
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
      <Search query={searchParams?.query || ''} />
      <div className='mt-8 flex w-[580px] max-w-full flex-col items-center rounded-md bg-white shadow-md'>
        <div className='mt-5 flex w-full flex-col items-center gap-1 bg-[#FEF9EE] p-2'>
          <h1 className='text-xl font-semibold'>{item.name_kor}</h1>
          <h2 className='text-sm'>{item.name_eng}</h2>
        </div>
        <div className='flex flex-col items-center gap-2 p-4'>
          <Image
            className='aspect-square object-contain'
            src={getItemImage(item.maple_item_id ?? 0)}
            width={80}
            height={80}
            alt={item.name_kor ?? 'No Name'}
          />
          <div className='flex items-center gap-2'>
            <span className='text-lg'>직업</span>
            <span className='text-lg text-[#FB9E48]'>전사</span>
          </div>
          <div className='flex gap-2'>
            <div className='flex w-40 flex-col rounded-md border border-[#E0E0E0] bg-[#F9F9F9] p-2'>
              <span>카테고리 {item.category}</span>
              <span>하위 카테고리 {item.sub_category}</span>
              <span>전체 카테고리 {item.overall_category}</span>
            </div>
            <div className='flex w-40 flex-col rounded-md border border-[#E0E0E0] bg-[#F9F9F9] p-2'>
              <span>REQ LEV: {item.req_level ?? 0}</span>
              <span>REQ STR: {item.req_str ?? 0}</span>
              <span>REQ DEX: {item.req_dex ?? 0}</span>
              <span>REQ INT: {item.req_int ?? 0}</span>
              <span>REQ LUK: {item.req_luk ?? 0}</span>
              <span>REQ POP: {item.req_pop ?? 0}</span>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <span>업그레이드 가능 횟수: {item.upgradable_count ?? 0}</span>
          </div>
          <div className='mt-4 flex w-80 justify-center bg-[#FB9E48] p-4'>
            <span className='text-white'>상점 거래가: {item.price_shop ?? 0} 메소</span>
          </div>
        </div>
      </div>
    </section>
  )
}
