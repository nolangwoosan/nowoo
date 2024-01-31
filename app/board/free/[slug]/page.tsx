import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { notFound } from 'next/navigation'

import supabase from '@/lib/utils/supabase'

dayjs.extend(utc)
dayjs.extend(timezone)

import Link from 'next/link'
import { Fragment } from 'react'

import { ROUTES } from '@/constants/routes'

import { CommentInput } from './comment-input'
import { Comments } from './comments'
import { DeleteButton } from './delete-button'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: Props) {
  const { data: board } = await supabase
    .from('boards')
    .select('title, description, writer, created_dt')
    .eq('id', slug)
    .single()

  if (!board) notFound()

  return (
    <Fragment>
      <div className='mb-8 mt-24 min-h-[500px] w-full bg-white p-5'>
        <div className='mb-7 flex items-end justify-between border-b border-[#D8D8D8] pb-5'>
          <div className='flex flex-col gap-5'>
            <span className='font-bold'>{board.title}</span>
            <span className='text-[#999]'>{dayjs(board.created_dt).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')}</span>
          </div>
          <span className='text-[#999]'>{board.writer}</span>
        </div>
        <p className='whitespace-pre-wrap text-[#999]'>{board.description}</p>
      </div>
      <div className='flex w-full items-center justify-between'>
        <div className='flex gap-5'>
          <DeleteButton slug={slug} />
          {/* <button className='rounded-md border border-[#999] px-10 py-3 text-[#999]'>수정</button> */}
        </div>
        <Link className='rounded-md bg-[#FB9E48] px-12 py-4 text-white' href={ROUTES.FREE_BOARD.LIST}>
          목록
        </Link>
      </div>

      <CommentInput slug={slug} />

      <Comments slug={slug} />
    </Fragment>
  )
}
