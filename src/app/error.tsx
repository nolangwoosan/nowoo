'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { Logo } from '@/widgets/logo'

export default function CustomError({ error }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex h-[calc(100dvh-200px)] flex-col items-center justify-center gap-2'>
      <Logo />
      <h2 className='text-2xl font-bold'>무언가 문제가 발생했어요!</h2>
      <p>
        관리자에게 문의해주세요.{' '}
        <a
          className='text-blue-500 hover:underline'
          href='https://open.kakao.com/o/sYgOAa7f'
          rel='noreferrer'
          target='_blank'
        >
          카카오톡 1:1 문의
        </a>
      </p>
      <Link className='text-blue-500 hover:underline' href='/'>
        홈으로 돌아가기
      </Link>
    </div>
  )
}
