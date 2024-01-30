'use client'

import dayjs from 'dayjs'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

import { Boards } from './utils'

interface Props {
  boards: Boards['data']
}

export function Boards({ boards }: Props) {
  return (
    <div className='flex flex-col border-t border-[#D8D8D8]'>
      {boards?.map((board) => (
        <Link
          className='flex justify-between border-b border-[#D8D8D8] px-10 py-6 max-md:px-2'
          href={ROUTES.FREE_BOARD.DETAIL(board.id)}
          key={board.id}
        >
          <div className='max-w-[60%] truncate text-[#999999] max-md:max-w-[40%]'>{board.title}</div>
          <div className='flex items-center gap-24 max-md:gap-6'>
            <span className='max-w-[60px] truncate text-[#999999]'>{board.writer}</span>
            <span className='text-[#999999] max-md:hidden'>{dayjs(board.created_dt).format('YYYY.MM.DD HH:mm')}</span>
            <span className='text-[#999999] md:hidden'>{dayjs(board.created_dt).format('YYYY.MM.DD')}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
