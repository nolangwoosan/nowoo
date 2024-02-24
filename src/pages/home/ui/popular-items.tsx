import Link from 'next/link'

import { prisma } from '@/shared/helpers/db'
import { ROUTES } from '@/shared/routes'
import { ItemImage } from '@/widgets/item'

export default async function PopularItems() {
  const items = await prisma.item.findMany({
    where: {
      nameKor: {
        in: ['토비 표창', '이블윙즈', '뇌전 수리검', '노란색 우산', '장갑 공격력 주문서 60%'],
      },
    },
    select: {
      itemIdx: true,
      mapleItemId: true,
      nameKor: true,
    },
  })

  return (
    <div className='flex w-full flex-col gap-8 rounded-md bg-white p-12 shadow-md max-md:gap-4 max-md:p-8'>
      <span className='border-b border-[#D8D8D8] pb-4 text-xl font-bold'>다른 유저들이 선호하는 아이템</span>
      <div className='flex flex-col gap-4 rounded-sm max-md:gap-2'>
        {items?.map(({ itemIdx, mapleItemId, nameKor }) => (
          <Link className='flex items-center gap-8' key={itemIdx} href={ROUTES.ITEM(mapleItemId)}>
            <ItemImage
              className='aspect-square object-contain'
              itemId={mapleItemId}
              width={60}
              height={60}
              alt={nameKor}
            />
            <span>{nameKor}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
