import { prisma } from '@/shared/api-helpers/db'

export async function generateMetadata({
  params,
}: {
  params: { boardId: string }
}) {
  const board = await prisma.board.findUnique({
    where: {
      boardIdx: Number(params.boardId),
    },
    select: {
      title: true,
      description: true,
      writer: true,
      createdDt: true,
    },
  })

  return {
    title: `${board?.title || '자유 게시판'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
