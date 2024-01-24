import Footer from '@/app/_components/shared/footer'
import supabase from '@/app/_lib/utils/supabase'

import { getMonsterImage } from '../../(index)/utils'

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
    openGraph: {
      images: [
        {
          url: getMonsterImage(monster?.maple_mob_id || 0),
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
