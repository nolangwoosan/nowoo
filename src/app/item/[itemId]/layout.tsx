import { prisma } from '@/shared/api-helpers/db'
import { ROUTES } from '@/shared/routes'
import { openGraphImage } from '@/shared/ui/open-graph'
import { SearchLayout } from '@/widgets/search/ui/search-layout'

export const getItemImage = (itemId: number) => {
  return `http://maplestory.io/api/gms/62/item/${itemId}/icon?resize=3`
}

export async function generateMetadata({
  params,
}: {
  params: { itemId: string }
}) {
  const item = await prisma.item.findFirst({
    where: {
      mapleItemId: Number(params.itemId),
    },
    select: {
      nameKor: true,
      descriptionKor: true,
      mapleItemId: true,
    },
  })

  return {
    title: `${item?.nameKor || '아이템'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
    description: item?.descriptionKor || '메이플랜드 아이템 검색 사이트',
    alternates: {
      canonical: `https://nowoo.kr + ${ROUTES.ITEM(Number(params.itemId))}`,
    },
    openGraph: {
      title: `${item?.nameKor || '아이템'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: item?.descriptionKor || '메이플랜드 아이템 검색 사이트',
      url: `https://nowoo.kr + ${ROUTES.ITEM(Number(params.itemId))}`,
      images: [
        {
          url: item?.mapleItemId ? getItemImage(item.mapleItemId) : openGraphImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item?.nameKor || '아이템'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: item?.descriptionKor || '메이플랜드 아이템 검색 사이트',
      images: [
        {
          url: item?.mapleItemId ? getItemImage(item.mapleItemId) : openGraphImage,
        },
      ],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SearchLayout>{children}</SearchLayout>
}
