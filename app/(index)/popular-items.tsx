import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import { getItemImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

export default async function PopularItems() {
  const { data: items } = await supabase
    .from('items')
    .select('id, maple_item_id, name_kor')
    .filter('name_kor', 'in', '("이블윙즈","크리스탈 완드","퍼플 문라이트","일비 표창","고드름")')

  return (
    <div className='flex w-full flex-col gap-8 max-md:gap-4'>
      <span className='text-2xl font-bold'>다른 유저들이 선호하는 아이템</span>
      <div className='flex flex-col gap-4 rounded-sm bg-white p-12 shadow-md max-md:gap-2 max-md:p-4'>
        {items?.map((item) => (
          <Link className='flex items-center gap-8' key={item.id} href={ROUTES.ITEM(item.maple_item_id)}>
            <Image
              className='aspect-square object-contain'
              src={getItemImage(item.maple_item_id)}
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
