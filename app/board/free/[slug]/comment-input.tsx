'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { maxLength, minLength, object, Output, string } from 'valibot'

import { createComment } from './action'

interface Props {
  slug: string
}

const schema = object({
  comment: string('댓글을 입력해주세요.', [
    minLength(1, '댓글을 입력해주세요.'),
    maxLength(500, '댓글은 500자 이내로 입력해주세요.'),
  ]),
  password: string('비밀번호을 입력해주세요.', [
    minLength(1, '비밀번호을 입력해주세요.'),
    maxLength(10, '비밀번호은 10자 이내로 입력해주세요.'),
  ]),
})

type Schema = Output<typeof schema>

export function CommentInput({ slug }: Readonly<Props>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: valibotResolver(schema),
  })

  const onSubmit = async ({ comment, password }: Schema) => {
    const { status } = await createComment({
      slug,
      comment,
      password,
    })

    if (status === 200) {
      setValue('comment', '')
      setValue('password', '')
      alert('댓글이 등록되었습니다.')
    } else {
      alert('댓글 등록에 실패했습니다.')
    }
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className='mt-5 h-24 w-full border border-[#D8D8D8] p-5'
        placeholder='댓글을 입력해주세요.'
        {...register('comment')}
      />
      {errors.comment && <span className='text-[#FF3B3B]'>{errors.comment.message}</span>}
      <div className='mt-5 flex justify-end'>
        <div className='flex flex-col'>
          <input
            className='mr-3 h-10 rounded-md border border-[#D8D8D8] p-2'
            type='password'
            placeholder='비밀번호'
            {...register('password')}
          />
          {errors.password && <span className='text-[#FF3B3B]'>{errors.password.message}</span>}
        </div>
        <button
          className='h-10 rounded-md bg-[#FB9E48] px-8 text-white disabled:opacity-50 max-md:px-4'
          type='submit'
          disabled={isSubmitting}
        >
          등록
        </button>
      </div>
    </form>
  )
}
