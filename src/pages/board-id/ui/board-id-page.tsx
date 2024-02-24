import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { notFound } from 'next/navigation'

dayjs.extend(utc)
dayjs.extend(timezone)

import Link from 'next/link'
import { Fragment } from 'react'

import { prisma } from '@/shared/helpers/db'
import { ROUTES } from '@/shared/routes'

import { CommentInput } from './comment-input'
import { Comments } from './comments'
import { DeleteButton } from './delete-button'

interface Props {
  boardId: string
}

export async function BoardIdPage({ boardId }: Readonly<Props>) {
  const board = await prisma.board.findUnique({
    where: {
      boardIdx: Number(boardId),
    },
    select: {
      title: true,
      description: true,
      writer: true,
      createdDt: true,
    },
  })

  if (!board) notFound()

  return (
    <Fragment>
      <div className='mt-24 min-h-[500px] w-full bg-white p-5'>
        <div className='mb-7 flex items-end justify-between border-b border-[#D8D8D8] pb-2'>
          <div className='flex flex-col gap-3'>
            <span className='text-xl font-bold'>{board.title}</span>
            <span className='text-[#999]'>{dayjs(board.createdDt).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')}</span>
          </div>
          <span className='text-[#999]'>{board.writer.gameNick}</span>
        </div>
        <p className='whitespace-pre-wrap break-words text-[#999]'>{board.description}</p>
      </div>
      <div className='flex w-full items-center justify-between'>
        <div className='flex gap-5'>
          <DeleteButton boardId={boardId} />
        </div>
        <Link
          className='rounded-md bg-[#FB9E48] px-6 py-2 text-lg text-white hover:opacity-70'
          href={ROUTES.FREE_BOARD.LIST}
        >
          목록
        </Link>
      </div>

      <CommentInput boardId={boardId} />

      <Comments boardId={boardId} />
    </Fragment>
  )
}
