import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/app/_constants/routes'
import { Tables } from '@/app/_types/supabase'

import { getItemImage } from './utils'

interface Props {
  items: Tables<'items'>[]
}

export default async function SearchResult({ items }: Readonly<Props>) {
  if (!items.length) return null

  return (
    <div className='border-red absolute z-10 w-full rounded-b-[30px] border-red-900 bg-white shadow-md'>
      <div className='flex flex-col gap-4 p-8'>
        <div className='text-center text-2xl font-bold text-gray-600'>아이템</div>
        <div className='flex flex-col gap-2 px-4'>
          {items?.map((item) => (
            <Link
              className='flex items-center gap-4'
              href={item.maple_item_id ? ROUTES.ITEM(item.maple_item_id) : ROUTES.HOME}
              key={item.id}
            >
              <Image src={getItemImage(item.maple_item_id ?? 0)} width={32} height={32} alt={item.name_kor ?? ''} />
              <span>{item.name_kor}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
