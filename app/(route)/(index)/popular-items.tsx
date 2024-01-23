import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/app/_constants/routes'

import { getItemImage, getItems } from './utils'

export default async function PopularItems() {
  const items = await getItems()

  return (
    <div className='flex w-full flex-col gap-8'>
      <span className='text-2xl font-bold'>다른 유저들이 선호하는 아이템</span>
      <div className='flex flex-col gap-4 rounded-sm bg-white p-12 shadow-md max-sm:p-4'>
        {items?.slice(0, 5)?.map((item) => (
          <Link
            className='flex items-center gap-8'
            key={item.id}
            href={item.maple_item_id ? ROUTES.ITEM(item.maple_item_id) : ROUTES.HOME}
          >
            <Image
              className='aspect-square object-contain'
              src={getItemImage(item.maple_item_id ?? 0)}
              width={60}
              height={60}
              alt={item.name_kor ?? ''}
            />
            <span>{item.name_kor}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
