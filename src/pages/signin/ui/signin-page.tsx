'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Output, email, minLength, object, string } from 'valibot'

import { icon } from '@/shared/icon'
import { Logo } from '@/widgets/logo'

const userSchema = object({
  email: string([minLength(1, '이메일을 입력해주세요.'), email('이메일 형식에 맞게 입력해주세요.')]),
})

type UserSchema = Output<typeof userSchema>

export function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSchema>({
    resolver: valibotResolver(userSchema),
  })

  const onSumbit = async (data: UserSchema) => {
    signIn('email', {
      email: data.email,
      callbackUrl: '/',
    })
  }

  return (
    <div className='flex justify-center items-center flex-col gap-4 py-20'>
      <form
        className='flex flex-col gap-2 mb-4 p-8 border border-gray-300 rounded-lg shadow-md'
        onSubmit={handleSubmit(onSumbit)}
      >
        <div className='mb-4 flex justify-center'>
          <Logo />
        </div>
        <label className='flex flex-col gap-1 w-80' htmlFor='email'>
          <span className='font-medium'>이메일</span>
          <input
            className='border border-gray-300 rounded-md p-2'
            type='text'
            placeholder='nowoo@example.com'
            {...register('email')}
          />
          <small className='text-red-500'>{errors.email?.message}</small>
        </label>

        <button className='bg-gray-900 text-white rounded-md p-2' type='submit'>
          이메일로 계속 하기
        </button>
        <hr className='mt-4 bg-gray-300 h-[1px] w-full' />
        <button
          className='bg-[#FEE500] text-gray-900 rounded-md p-2 mt-4 flex items-center gap-2 justify-center'
          type='button'
          onClick={() => signIn('kakao', { callbackUrl: '/' })}
        >
          <Image src={icon.kakao} width={16} height={16} alt='kakao' />
          <span>카카오 로그인</span>
        </button>
        <button
          className='text-white rounded-md p-2 bg-black flex items-center gap-2 justify-center'
          type='button'
          onClick={() => signIn('discord', { callbackUrl: '/' })}
        >
          <span>디스코드 로그인</span>
        </button>
        <button
          className='text-white rounded-md p-2 bg-black flex items-center gap-2 justify-center'
          type='button'
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <span>구글 로그인</span>
        </button>
      </form>
    </div>
  )
}
