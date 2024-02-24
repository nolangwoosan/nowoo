import Link from 'next/link'

export function Header() {
  return (
    <header className='fixed top-4 right-4'>
      <Link className='text-black hover:text-blue-700 px-4 py-2 bg-slate-300 rounded-lg' href='/api/auth/signin'>
        Login
      </Link>
    </header>
  )
}
