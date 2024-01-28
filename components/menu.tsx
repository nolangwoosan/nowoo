import Link from 'next/link'

export function Menu() {
  return (
    <div className='flex'>
      <Link className='border-r border-[#BCBCBC] px-6' href='/'>
        자유게시판
      </Link>
      <Link className='border-r border-[#BCBCBC] px-6' href='/'>
        거래게시판
      </Link>
      <Link className='px-4' href='/'>
        Mapleland
      </Link>
    </div>
  )
}
