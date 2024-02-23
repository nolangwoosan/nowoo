import { useSuspenseQueries } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect } from 'react'

import { ROUTES } from '@/shared/routes'
import { ItemImage } from '@/widgets/item'
import { MonsterImage } from '@/widgets/monster'

import { Items, Monsters } from './search-form'

interface Props {
  searchValue: string
  onCheckFirstSearchResult: (items: Items['data'], monsters: Monsters['data']) => void
}

const QUERY_KEYS = {
  items: (query: string) => ['items', { query }],
  monsters: (query: string) => ['monsters', { query }],
}

export function SearchResult({ searchValue, onCheckFirstSearchResult }: Readonly<Props>) {
  const [itemsQuery, monstersQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.items(searchValue),
        queryFn: () => fetch(`/api/items?query=${searchValue}`).then((res) => res.json() as Promise<Items>),
      },
      {
        queryKey: QUERY_KEYS.monsters(searchValue),
        queryFn: () => fetch(`/api/monsters?query=${searchValue}`).then((res) => res.json() as Promise<Monsters>),
      },
    ],
  })

  const items = itemsQuery.data?.data
  console.log(itemsQuery.data)

  const monsters = monstersQuery.data?.data

  useEffect(() => {
    onCheckFirstSearchResult(items ?? [], monsters ?? [])
  }, [items, monsters, onCheckFirstSearchResult])

  if (!items.length && !monsters.length) {
    return (
      <div className='flex flex-col gap-4 py-8'>
        <span className='text-center text-xl font-semibold text-gray-300 max-md:text-base'>검색 결과가 없습니다.</span>
      </div>
    )
  }

  return (
    <>
      {Boolean(items?.length) && (
        <div className='flex flex-col gap-4 py-8'>
          <div className='text-center text-2xl font-bold text-gray-600 max-md:text-base'>아이템</div>
          <div className='flex flex-col'>
            {items?.map(({ itemIdx, mapleItemId, nameKor }) => (
              <Link
                key={itemIdx}
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={ROUTES.ITEM(mapleItemId)}
              >
                <ItemImage
                  itemId={mapleItemId}
                  className='aspect-square object-contain'
                  width={48}
                  height={48}
                  alt={nameKor}
                />
                <span>{nameKor}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {Boolean(monsters?.length) && (
        <div className='flex flex-col gap-4'>
          <div className='text-center text-2xl font-bold text-gray-600 max-md:text-base'>몬스터</div>
          <div className='flex flex-col'>
            {monsters?.map(({ monsterIdx, mapleMobId, nameKor }) => (
              <Link
                key={monsterIdx}
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={ROUTES.MONSTER(mapleMobId)}
              >
                <MonsterImage
                  monsterId={mapleMobId}
                  className='aspect-square object-contain'
                  width={48}
                  height={48}
                  alt={nameKor}
                />
                <span>{nameKor}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
