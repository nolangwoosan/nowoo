import { Search } from 'lucide-react'

import { cn } from '@/app/_styles/utils'

interface Props {
  isItemExist: boolean
  searchValue: string
  onChangeSearchValue: (value: string) => void
}

export default function SearchBar({ isItemExist, searchValue, onChangeSearchValue }: Readonly<Props>) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-4 rounded-[30px] bg-white px-8 py-4',
        isItemExist && 'rounded-b-none'
      )}
    >
      <input
        className='flex-1 border-none p-0 focus:border-transparent focus:ring-0'
        type='text'
        value={searchValue}
        onChange={(e) => onChangeSearchValue(e.target.value)}
        placeholder='아이템 or 몬스터 이름'
      />
      <Search />
    </div>
  )
}
