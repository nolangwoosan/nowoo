import { useSuspenseQueries } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { ROUTES } from '@/constants/routes'
import { getItemImage, getMonsterImage } from '@/lib/utils'

import { Items, Monsters } from './search-form'

interface Props {
  searchValue: string
  onCheckFirstSearchResult: (items: Items['data'], monsters: Monsters['data']) => void
}

const QUERY_KEYS = {
  items: (query: string) => ['items', { query }],
  monsters: (query: string) => ['monsters', { query }],
}

export default function SearchResult({ searchValue, onCheckFirstSearchResult }: Readonly<Props>) {
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
            {items?.map((item) => (
              <Link
                key={item.id}
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={item.maple_item_id ? ROUTES.ITEM(item.maple_item_id) : ROUTES.HOME}
              >
                <Image
                  className='aspect-square object-contain'
                  src={getItemImage(item.maple_item_id ?? 0)}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/pixil-frame-0%20(2)%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGl4aWwtZnJhbWUtMCAoMikgMS5wbmciLCJpYXQiOjE3MDY2MTcxNjYsImV4cCI6MTg2NDI5NzE2Nn0.iNiQPIQ6Vz6KxFhHxmAtZZX9o5YezdjqbrViLhXORGc&t=2024-01-30T12%3A19%3A27.033Z'
                  }}
                  width={48}
                  height={48}
                  alt={item.name_kor ?? ''}
                />
                <span>{item.name_kor}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {Boolean(monsters?.length) && (
        <div className='flex flex-col gap-4'>
          <div className='text-center text-2xl font-bold text-gray-600 max-md:text-base'>몬스터</div>
          <div className='flex flex-col'>
            {monsters?.map((monster) => (
              <Link
                key={monster.id}
                className='flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white'
                href={monster.maple_mob_id ? ROUTES.MONSTER(monster.maple_mob_id) : ROUTES.HOME}
              >
                <Image
                  className='aspect-square object-contain'
                  src={getMonsterImage(monster.maple_mob_id ?? 0)}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/pixil-frame-0%20(2)%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGl4aWwtZnJhbWUtMCAoMikgMS5wbmciLCJpYXQiOjE3MDY2MTcxNjYsImV4cCI6MTg2NDI5NzE2Nn0.iNiQPIQ6Vz6KxFhHxmAtZZX9o5YezdjqbrViLhXORGc&t=2024-01-30T12%3A19%3A27.033Z'
                  }}
                  width={48}
                  height={48}
                  alt={monster.name_kor ?? ''}
                />
                <span>{monster.name_kor}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
