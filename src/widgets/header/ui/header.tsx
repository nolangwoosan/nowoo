import { getServerSession } from '@/entities/auth'
import Link from 'next/link'

export async function Header() {
  const session = await getServerSession()

  return (
    <header className='fixed top-4 right-4'>
      <Link className='px-4 py-2 bg-gray-900 rounded-md text-white' href='/signin'>
        로그인
      </Link>
    </header>
  )
}
