'use client'

import { useSession } from '@/entities/auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  const session = useSession()

  return (
    <header className='sticky bg-gray-300 w-full z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200'>
      <div className='p-4 flex justify-end'>
        {session.status === 'authenticated' ? (
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2'>
              <Image
                className='rounded-full'
                src={session.data?.user?.image ?? ''}
                width={24}
                height={24}
                alt='user profile'
              />
              <span>{session.data?.user?.name}</span>
            </div>
            <button className='px-4 py-2 bg-gray-900 rounded-md text-white' type='button' onClick={() => signOut()}>
              로그아웃
            </button>
          </div>
        ) : (
          <Link className='px-4 py-2 bg-gray-900 rounded-md text-white' href='/signin'>
            로그인
          </Link>
        )}
      </div>
    </header>
  )
}
