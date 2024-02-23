'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Output, minLength, object, string } from 'valibot'

import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog'
import { useToast } from '@/shared/ui/use-toast'

import { deleteComment } from '../lib/action'

interface Props {
  boardId: string
  commentId: string
}

const schema = object({
  password: string('비밀번호를 입력해주세요.', [minLength(1, '비밀번호를 입력해주세요.')]),
})

type Schema = Output<typeof schema>

export function CommentDeleteButton({ boardId, commentId }: Readonly<Props>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Schema>({
    resolver: valibotResolver(schema),
  })
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const onSubmit = async ({ password }: Schema) => {
    const response = await deleteComment({ boardId, commentId, password })

    if (response.status === 200) {
      toast({
        title: '댓글 삭제',
        description: '댓글이 삭제되었습니다.',
      })
      setIsOpen(false)
    } else if (response.status === 401) {
      setError('password', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='h-fit rounded-md bg-gray-300 text-white hover:opacity-70'>
        <X />
      </DialogTrigger>
      <DialogContent className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
        <form className='relative flex flex-col rounded-md bg-white p-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-10 flex flex-col gap-2'>
            <span className='font-bold'>댓글 삭제</span>
            <span className='text-[#717171]'>비밀번호를 입력해주세요</span>
          </div>
          <div className='flex gap-2'>
            <input
              className='h-9 border-none bg-[#F1F1F1] p-2'
              type='password'
              placeholder='비밀번호'
              {...register('password')}
            />
            <button
              className='h-9 w-20 bg-[#4E86F3] text-white disabled:opacity-50'
              type='submit'
              disabled={isSubmitting}
            >
              확인
            </button>
          </div>
          {errors.password && <span className='mt-1 text-sm text-red-600'>{errors.password.message?.toString()}</span>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
