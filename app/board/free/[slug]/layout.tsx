import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: '자유 게시판 - 메이플랜드 아이템 검색 사이트',
  description: '자유 게시판 - 메이플랜드 아이템 검색 사이트',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Fragment>{children}</Fragment>
}
