import './globals.css'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import GoogleAnalytics from '@/components/google-analytics'
import { openGraphImage } from '@/constants/open-graph'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NOWOO - 메이플랜드 아이템 검색 사이트',
  description: '메이플랜드 아이템 검색 사이트',
  applicationName: 'NOWOO',
  keywords: '메이플스토리, 메이플랜드, 아이템, 몬스터',
  creator: 'NOWOO',
  metadataBase: new URL('https://nowoo.kr'),
  alternates: {
    canonical: 'https://nowoo.kr',
  },
  icons: [
    {
      rel: 'icon',
      url: 'https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b28ucG5nIiwiaWF0IjoxNzA2MDYxODE1LCJleHAiOjE4NjM3NDE4MTV9.jjylwylu28UmnAnVbdiPpYoXuYw3H5fta1C4d_ER2N0&t=2024-01-24T02%3A03%3A35.771Z',
    },
  ],
  openGraph: {
    siteName: 'NOWOO',
    type: 'website',
    title: 'NOWOO - 메이플랜드 아이템 검색 사이트',
    description: '메이플랜드 아이템 검색 사이트',
    url: 'https://nowoo.kr',
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOWOO - 메이플랜드 아이템 검색 사이트',
    description: '메이플랜드 아이템 검색 사이트',
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  verification: {
    google: 'Kqvp08KOCUZgU4pyr6CUFymLP3Fw6EyNaQjmSrAa5fg',
    other: {
      'naver-site-verification': 'b779ab4179ff0174da67f6f4178e29bda49a5a7f',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className={cn(inter.className, 'min-h-dvh text-[#222222]')}>
        <VercelAnalytics />
        <GoogleAnalytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
