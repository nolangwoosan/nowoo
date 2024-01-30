'use client'

import dayjs from 'dayjs'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

import { useBoard } from './utils'

export default function Boards() {
  const boardQuery = useBoard({ page: 1, pageSize: 10 })

  return (
    <div className='flex flex-col border-t border-[#D8D8D8]'>
      {boardQuery.data.data.map((board) => (
        <Link
          className='flex justify-between border-b border-[#D8D8D8] px-10 py-6'
          href={ROUTES.FREE_BOARD.DETAIL(board.id)}
          key={board.id}
        >
          <div>
            <span className='text-[#999999]'>{board.title}</span>
          </div>
          <div className='flex items-center gap-24'>
            <span className='text-[#999999]'>{board.writer}</span>
            <span className='text-[#999999]'>{dayjs(board.created_dt).format('YYYY.MM.DD HH:mm')}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
