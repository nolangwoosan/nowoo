import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

import { BoardIdPage } from '@/pages/board-id'

interface Props {
  params: {
    boardId: string
  }
}

export default async function Page({ params: { boardId } }: Readonly<Props>) {
  return <BoardIdPage boardId={boardId} />
}
