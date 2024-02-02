import Link from 'next/link'

import { ItemImage } from '@/components/item-image'
import { ROUTES } from '@/constants/routes'
import supabase from '@/lib/utils/supabase'

export default async function PopularItems() {
  const { data: items } = await supabase
    .from('items')
    .select('id, maple_item_id, name_kor')
    .filter('name_kor', 'in', '("일비 표창","크리스탈 완드","뇌전 수리검","노란색 우산","고드름")')

  return (
    <div className='flex w-full flex-col gap-8 max-md:gap-4'>
      <span className='text-2xl font-bold'>다른 유저들이 선호하는 아이템</span>
      <div className='flex flex-col gap-4 rounded-sm bg-white p-12 shadow-md max-md:gap-2 max-md:p-4'>
        {items?.map((item) => (
          <Link className='flex items-center gap-8' key={item.id} href={ROUTES.ITEM(item.maple_item_id)}>
            <ItemImage
              className='aspect-square object-contain'
              itemId={item.maple_item_id}
              width={60}
              height={60}
              alt={item.name_kor}
            />
            <span>{item.name_kor}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
