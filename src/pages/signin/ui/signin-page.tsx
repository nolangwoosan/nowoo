'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Output, email, minLength, object, string } from 'valibot'

import { toast } from '@/shared/hooks/use-toast'
import { icon } from '@/shared/icon'
import { ROUTES } from '@/shared/routes'
import { Logo } from '@/widgets/logo'

const userSchema = object({
  email: string([minLength(1, '이메일을 입력해주세요.'), email('이메일 형식에 맞게 입력해주세요.')]),
  password: string([minLength(1, '비밀번호를 입력해주세요.')]),
})

type UserSchema = Output<typeof userSchema>

export function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: valibotResolver(userSchema),
  })

  const onSumbit = async (data: UserSchema) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/',
    })

    if (!result?.ok) {
      toast({
        title: '로그인 실패',
        description: '일치하는 정보가 없습니다.',
      })
      return
    }

    toast({
      title: '로그인 성공',
      description: '로그인에 성공하였습니다.',
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
        <label className='flex flex-col gap-1' htmlFor='password'>
          <span className='font-medium'>비밀번호</span>
          <input className='border border-gray-300 rounded-md p-2' type='password' {...register('password')} />
          <small className='text-red-500'>{errors.password?.message}</small>
        </label>
        <button className='bg-gray-900 text-white rounded-md p-2 mt-4' type='submit'>
          로그인
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
        <Link className='text-gray-600 text-center mt-2 text-sm' href={ROUTES.SIGN_UP}>
          이메일로 회원가입
        </Link>
      </form>
    </div>
  )
}
