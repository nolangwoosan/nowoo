import { prisma } from '@/shared/helpers/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''

  const items = await prisma.item.findMany({
    where: {
      nameKor: {
        contains: query.split(' ').join(''),
      },
    },
    select: {
      itemIdx: true,
      mapleItemId: true,
      nameKor: true,
    },
    take: 5,
  })

  return new Response(
    JSON.stringify({
      data: items,
    })
  )
}
