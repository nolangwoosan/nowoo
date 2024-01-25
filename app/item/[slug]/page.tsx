import Image from 'next/image'
import { notFound } from 'next/navigation'

import Logo from '@/components/logo'
import Search from '@/components/search'
import { getItemImage, getItems, getMonsters } from '@/lib/utils'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = params

  const items = await getItems()
  const monsters = await getMonsters()

  const item = items.find(({ maple_item_id }) => maple_item_id?.toString() === slug)

  if (!item) return notFound()

  return (
    <section className='flex flex-col items-center gap-4 p-24 max-sm:px-4 max-sm:py-16'>
      <Logo />
      <Search items={items} monsters={monsters} />
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
            <div className='flex w-40 flex-col rounded-md border border-gray-300 bg-gray-200 p-2'>
              <span>카테고리 {item.category}</span>
              <span>하위 카테고리 {item.sub_category}</span>
              <span>전체 카테고리 {item.overall_category}</span>
            </div>
            <div className='flex w-40 flex-col rounded-md border border-gray-300 bg-gray-200 p-2'>
              <span>REQ LEV: {item.req_level}</span>
              <span>REQ STR: {item.req_str}</span>
              <span>REQ DEX: {item.req_dex}</span>
              <span>REQ INT: {item.req_int}</span>
              <span>REQ LUK: {item.req_luk}</span>
              <span>REQ POP: {item.req_pop}</span>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <span>업그레이드 가능 횟수: {item.upgradable_count}</span>
          </div>
          <div className='mt-4 flex w-80 justify-center rounded-md bg-orange-400 p-4'>
            <span className='text-white'>상점 거래가: {item.price_shop} 메소</span>
          </div>
        </div>
      </div>
    </section>
  )
}
