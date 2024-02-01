'use client'

import dayjs from 'dayjs'

interface Props {
  createdAt: string
}

export function CommentDate({ createdAt }: Props) {
  return <span className='text-sm text-gray-400'>{dayjs(createdAt).tz().format('YYYY.MM.DD HH:mm')}</span>
}
