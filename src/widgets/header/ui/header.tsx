import { getServerSession } from '@/entities/auth'
import Link from 'next/link'

export async function Header() {
  const session = await getServerSession()

  return (
    <header className='fixed top-4 right-4'>
      <Link className='text-black hover:text-blue-700 px-4 py-2 bg-slate-300 rounded-lg' href='/signin'>
        Login
      </Link>
    </header>
  )
}
