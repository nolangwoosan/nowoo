import Footer from '@/components/footer'
import { openGraphImage } from '@/constants/open-graph'
import { ROUTES } from '@/constants/routes'
import { getMonsterImage } from '@/lib/utils'
import supabase from '@/lib/utils/supabase'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: monster } = await supabase
    .from('monsters')
    .select('name_kor, description_kor, maple_mob_id')
    .match({
      maple_mob_id: params.slug,
    })
    .single()

  return {
    title: `${monster?.name_kor || '몬스터'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
    description: monster?.description_kor || '메이플랜드 아이템 검색 사이트',
    alternates: {
      canonical: `https://nowoo.kr + ${ROUTES.MONSTER(Number(params.slug))}`,
    },
    openGraph: {
      title: `${monster?.name_kor || '몬스터'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: monster?.description_kor || '메이플랜드 아이템 검색 사이트',
      url: `https://nowoo.kr + ${ROUTES.MONSTER(Number(params.slug))}`,
      images: [
        {
          url: monster?.maple_mob_id ? getMonsterImage(monster.maple_mob_id) : openGraphImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${monster?.name_kor || '몬스터'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: monster?.description_kor || '메이플랜드 아이템 검색 사이트',
      images: [
        {
          url: monster?.maple_mob_id ? getMonsterImage(monster.maple_mob_id) : openGraphImage,
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
  return (
    <main className='h-full'>
      {children}
      <Footer />
    </main>
  )
}
