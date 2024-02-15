'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { maxLength, minLength, object, Output, string } from 'valibot'

import { useToast } from '@/components/toast/use-toast'
import { ROUTES } from '@/constants/routes'

import { QUERY_KEY } from '../utils'
import { createBoard } from './action'

const boardSchema = object({
  title: string('제목을 입력해주세요.', [
    minLength(1, '제목을 입력해주세요.'),
    maxLength(20, '제목은 20자 이내로 입력해주세요.'),
  ]),
  content: string('내용을 입력해주세요.', [
    minLength(1, '내용을 입력해주세요.'),
    maxLength(500, '내용은 500자 이내로 입력해주세요.'),
  ]),
  password: string('비밀번호를 입력해주세요.', [
    minLength(1, '비밀번호를 입력해주세요.'),
    maxLength(10, '비밀번호은 10자 이내로 입력해주세요.'),
  ]),
})

type BoardSchema = Output<typeof boardSchema>

export default function Page() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BoardSchema>({
    resolver: valibotResolver(boardSchema),
  })
  const { toast } = useToast()

  const onSubmit = async (data: BoardSchema) => {
    if (await createBoard(data)) {
      toast({
        title: '등록 성공',
        description: '게시글이 성공적으로 등록되었습니다.',
      })
      router.push(ROUTES.FREE_BOARD.LIST)
      return queryClient.invalidateQueries({
        queryKey: QUERY_KEY.FREE_BOARD,
      })
    }

    toast({
      title: '등록 실패',
      description: '게시글 등록에 실패하였습니다.',
    })
  }

  return (
    <Fragment>
      <form className='mt-24 w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='border-b border-[#D8D8D8] pb-6'>
          <h1 className='text-2xl font-bold max-md:text-xl'>자유게시판</h1>
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center gap-2 border-b border-[#D8D8D8] px-4 py-3 max-md:flex-col max-md:items-start max-md:px-0'>
            <span className='w-[200px] max-md:text-lg max-md:font-semibold'>카테고리</span>
            <div className='flex-1 max-md:w-full'>
              <input
                className='w-full rounded-md border-none px-5 py-3'
                placeholder='제목을 입력해주세요.'
                {...register('title')}
              />
              {errors.title && <span className='text-sm text-red-600'>{errors.title.message?.toString()}</span>}
            </div>
          </div>

          <div className='flex items-center gap-2 border-b border-[#D8D8D8] px-4 py-3 max-md:flex-col max-md:items-start max-md:px-0'>
            <span className='w-[200px] max-md:text-lg max-md:font-semibold'>제목</span>
            <div className='flex-1 max-md:w-full'>
              <input
                className='w-full rounded-md border-none px-5 py-3'
                placeholder='제목을 입력해주세요.'
                {...register('title')}
              />
              {errors.title && <span className='text-sm text-red-600'>{errors.title.message?.toString()}</span>}
            </div>
          </div>

          <div className='flex items-center gap-2 border-b border-[#D8D8D8] px-4 py-3 max-md:flex-col max-md:items-start max-md:px-0'>
            <span className='w-[200px] max-md:text-lg max-md:font-semibold'>내용</span>
            <div className='flex-1 max-md:w-full'>
              <textarea
                className='h-[250px] w-full rounded-md border-none px-5 py-3'
                placeholder='내용을 입력해주세요.'
                {...register('content')}
              />
              {errors.content && <span className='text-sm text-red-600'>{errors.content.message?.toString()}</span>}
            </div>
          </div>

          <div className='flex items-center gap-2 border-b border-[#D8D8D8] px-4 py-3 max-md:flex-col max-md:items-start max-md:px-0'>
            <span className='w-[200px] max-md:text-lg max-md:font-semibold'>비밀번호</span>
            <div className='flex-1 max-md:w-full'>
              <input
                className='w-full rounded-md border-none px-5 py-3'
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                {...register('password')}
              />
              {errors.password && <span className='text-sm text-red-600'>{errors.password.message?.toString()}</span>}
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className='mt-7 rounded-md bg-[#FB9E48] px-8 py-3 text-xl text-white disabled:opacity-50'
            type='submit'
            disabled={isSubmitting}
          >
            등록하기
          </button>
        </div>
      </form>
      <button
        type='button'
        onClick={() => {
          toast({
            title: '등록 성공',
            description: '게시글이 성공적으로 등록되었습니다.',
          })
        }}
      >
        asd
      </button>
    </Fragment>
  )
}
