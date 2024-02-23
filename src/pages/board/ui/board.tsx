'use client'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Link from 'next/link'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Seoul')

import { ROUTES } from '@/shared/routes'

import { type Boards } from '../lib/use-board'

interface Props {
  boards: Boards['data']
}

export function Board({ boards }: Props) {
  return (
    <div className='flex flex-col border-t border-[#D8D8D8]'>
      {boards?.map((board) => (
        <Link
          className='flex justify-between border-b border-[#D8D8D8] px-10 py-6 max-md:px-2'
          href={ROUTES.FREE_BOARD.DETAIL(board.id.toString())}
          key={board.id}
        >
          <div className='flex max-w-[60%] items-center gap-1 text-gray-600 max-md:max-w-[40%]'>
            <span className='truncate'>{board.title}</span>
            <span>({board.comment_count})</span>
          </div>
          <div className='flex items-center gap-24 max-md:gap-6'>
            <span className='truncate text-[#999999]'>{board.writer}</span>
            <span className='text-sm text-[#999999] max-md:hidden'>
              {dayjs(board.created_dt).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')}
            </span>
            <span className='text-sm text-[#999999] md:hidden'>
              {dayjs(board.created_dt).tz('Asia/Seoul').format('YYYY.MM.DD')}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
