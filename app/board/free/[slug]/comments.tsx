import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import supabase from '@/lib/utils/supabase'

import { CommentDeleteButton } from './comment-delete-button'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
  slug: string
}

type BoardCommentsReturnType = {
  comments: {
    id: string
    comment: string
    writer: string
    created_dt: string
  }
}[]

export async function Comments({ slug }: Readonly<Props>) {
  const { data: boardComments } = await supabase
    .from('board_comments')
    .select(
      `
    comments (
        id,
        comment,
        writer,
        created_dt
    )
    `
    )
    .match({
      board_id: slug,
    })
    .order('created_dt', { ascending: true })
    .is('deleted_dt', null)
    .returns<BoardCommentsReturnType>()

  return (
    <div className='flex w-full flex-col'>
      <span>{boardComments?.length ?? 0}개의 댓글</span>
      {boardComments?.map((comments) =>
        Object.values(comments).map((comment) => (
          <div className='mt-5 flex flex-col gap-1 rounded-md bg-white p-2 shadow-md' key={comment.id}>
            <div className='flex justify-between'>
              <span className='font-semibold'>{comment.writer}</span>
              <CommentDeleteButton slug={slug} commentId={comment.id} />
            </div>
            <span className='text-sm text-gray-400'>{dayjs(comment.created_dt).tz().format('YYYY.MM.DD HH:mm')}</span>
            <span className='mt-4 text-gray-600'>{comment.comment}</span>
          </div>
        ))
      )}
    </div>
  )
}
