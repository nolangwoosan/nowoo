export const ROUTES = {
  HOME: '/' as const,
  MONSTER: (id: number) => `/monster/${id}` as const,
  ITEM: (id: number) => `/item/${id}` as const,
  FREE_BOARD: {
    LIST: '/board/free' as const,
    CREATE: '/board/free/create' as const,
    DETAIL: (id: string) => `/board/free/${id}` as const,
    EDIT: (id: number) => `/board/free/${id}/edit` as const,
  },
}
