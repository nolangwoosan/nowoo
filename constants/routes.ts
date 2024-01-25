export const ROUTES = {
  HOME: '/' as const,
  MONSTER: (id: number) => `/monster/${id}` as const,
  ITEM: (id: number) => `/item/${id}` as const,
}
