import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '새 글 등록 - 메이플랜드 아이템 검색 사이트',
  description: '새 글 등록 - 메이플랜드 아이템 검색 사이트',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
