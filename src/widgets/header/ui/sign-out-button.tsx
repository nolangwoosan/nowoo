'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button className='px-4 h-9 bg-gray-900 rounded-md text-white text-sm' type='button' onClick={() => signOut()}>
      로그아웃
    </button>
  )
}
