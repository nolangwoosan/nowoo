'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { Output, custom, email, minLength, object, string } from 'valibot'

import { toast } from '@/shared/hooks/use-toast'
import { Logo } from '@/widgets/logo'
import { useForm } from 'react-hook-form'

const userSchema = object(
  {
    email: string([minLength(1, '이메일을 입력해주세요.'), email('이메일 형식에 맞게 입력해주세요.')]),
    password: string([minLength(1, '비밀번호를 입력해주세요.')]),
    passwordConfirm: string([minLength(1, '비밀번호를 입력해주세요.')]),
  },
  [custom(({ password, passwordConfirm }) => password === passwordConfirm, '비밀번호가 일치하지 않습니다.')]
)

type UserSchema = Output<typeof userSchema>

export function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: valibotResolver(userSchema),
  })

  const onSumbit = async (data: UserSchema) => {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })

    const result = await response.json()

    if (result.message) {
      toast({
        title: '회원가입 실패',
        description: result.message,
      })
    }

    if (result.data) {
      toast({
        title: '회원가입 성공',
        description: '회원가입에 성공하였습니다.',
      })
    }
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
          <span>이메일</span>
          <input
            className='border border-gray-300 rounded-md p-2'
            type='text'
            placeholder='nowoo@example.com'
            {...register('email')}
          />
          <small className='text-red-500'>{errors.email?.message}</small>
        </label>
        <label className='flex flex-col gap-1' htmlFor='password'>
          <span>비밀번호</span>
          <input className='border border-gray-300 rounded-md p-2' type='password' {...register('password')} />
          <small className='text-red-500'>{errors.password?.message}</small>
        </label>
        <label className='flex flex-col gap-1' htmlFor='password'>
          <span>비밀번호 확인</span>
          <input className='border border-gray-300 rounded-md p-2' type='password' {...register('passwordConfirm')} />
          <small className='text-red-500'>{errors.passwordConfirm?.message}</small>
        </label>
        <button className='bg-gray-900 text-white rounded-md p-2 mt-4' type='submit'>
          회원가입
        </button>
      </form>
    </div>
  )
}
