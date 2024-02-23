import { prisma } from '@/shared/api-helpers/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''

  const items = await prisma.monster.findMany({
    where: {
      nameKor: {
        contains: query.split(' ').join(''),
      },
    },
    select: {
      monsterIdx: true,
      mapleMobId: true,
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
