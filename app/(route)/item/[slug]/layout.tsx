import Footer from '@/app/_components/shared/footer'
import supabase from '@/app/_lib/utils/supabase'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: item } = await supabase
    .from('items')
    .select('name_kor, description_kor')
    .match({
      maple_item_id: params.slug,
    })
    .single()

  return {
    title: `${item?.name_kor || '아이템'} | NOWOO - 메이플랜드 아이템 검색 사이트`,
    description: item?.description_kor || '메이플랜드 아이템 검색 사이트',
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
