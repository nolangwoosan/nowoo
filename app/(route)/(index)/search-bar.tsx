import { cn } from '@/app/_styles/utils'

interface Props {
  isItemExist: boolean
  searchValue: string
  onChangeSearchValue: (value: string) => void
}

export default function SearchBar({ isItemExist, searchValue, onChangeSearchValue }: Readonly<Props>) {
  return (
    <div className='relative'>
      <input
        className={cn(
          'focus: w-[600px] max-w-3xl rounded-[30px] border-none px-8 py-4 focus:border-transparent focus:ring-0',
          isItemExist && 'rounded-b-none'
        )}
        type='text'
        value={searchValue}
        onChange={(e) => onChangeSearchValue(e.target.value)}
        placeholder='아이템 or 몬스터 이름'
      />
    </div>
  )
}
