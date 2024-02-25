'use client'

import { Logo } from '@/widgets/logo'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Output, email, minLength, object, string } from 'valibot'

import { toast } from '@/shared/hooks/use-toast'
import { ROUTES } from '@/shared/routes'

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
    <div className='flex justify-center items-center flex-col gap-4 pt-20'>
      <Logo />
      <form className='flex flex-col gap-2 mb-4' onSubmit={handleSubmit(onSumbit)}>
        <label className='flex flex-col gap-1 w-80' htmlFor='email'>
          <span>이메일</span>
          <input
            className='border border-gray-300 rounded-md p-2'
            type='text'
            placeholder='Email'
            {...register('email')}
          />
          <small className='text-red-500'>{errors.email?.message}</small>
        </label>
        <label className='flex flex-col gap-1' htmlFor='password'>
          <span>비밀번호</span>
          <input
            className='border border-gray-300 rounded-md p-2'
            type='password'
            placeholder='Password'
            {...register('password')}
          />
          <small className='text-red-500'>{errors.password?.message}</small>
        </label>
        <button className='bg-blue-500 text-white rounded-md p-2 mt-4' type='submit'>
          로그인
        </button>
        <hr className='mt-4 bg-gray-300 h-[1px] w-full' />
        <button
          className='bg-yellow-500 text-white rounded-md p-2 mt-4'
          type='button'
          onClick={() => signIn('kakao', { callbackUrl: '/' })}
        >
          카카오 로그인
        </button>
        <Link className='text-blue-500 text-center mt-2' href={ROUTES.SIGN_UP}>
          회원가입
        </Link>
      </form>
    </div>
  )
}
