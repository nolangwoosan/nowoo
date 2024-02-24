import { prisma } from '@/shared/helpers/db'

import { CommentDate } from './comment-date'
import { CommentDeleteButton } from './comment-delete-button'

interface Props {
  boardId: string
}

export async function Comments({ boardId }: Readonly<Props>) {
  const boardComments = await prisma.comment.findMany({
    select: {
      commentIdx: true,
      comment: true,
      writer: true,
      createdDt: true,
    },
    where: {
      boardId: Number(boardId),
      deletedDt: null,
    },
    orderBy: {
      createdDt: 'asc',
    },
  })

  return (
    <div className='flex w-full flex-col'>
      <span className='font-semibold'>{boardComments?.length ?? 0}개의 댓글</span>
      {boardComments?.map((comment) => (
        <div className='mt-4 flex flex-col gap-1 rounded-md bg-white p-4' key={comment.commentIdx}>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <span className='font-semibold'>{comment.comment}</span>
              <CommentDate createdAt={comment.createdDt.toISOString()} />
            </div>
            <CommentDeleteButton boardId={boardId} commentId={comment.commentIdx.toString()} />
          </div>
          <span className='mt-4 text-gray-600'>{comment.comment}</span>
        </div>
      ))}
    </div>
  )
}
