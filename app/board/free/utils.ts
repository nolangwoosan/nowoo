import { useSuspenseQuery } from '@tanstack/react-query'

interface Board {
  id: number
  title: string
  writer: string
  created_dt: string
}

interface Boards {
  count: number
  data: Board[]
}

export const QUERY_KEY = {
  FREE_BOARD: ['freeBoard'],
}

export const useBoard = ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) => {
  return useSuspenseQuery<Boards>({
    queryKey: [
      ...QUERY_KEY.FREE_BOARD,
      {
        page,
        pageSize,
      },
    ],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/boards/free?page=${page}&pageSize=${pageSize}`).then((res) =>
        res.json()
      ),
  })
}
