import localFont from 'next/font/local'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

import '@/app/_styles/globals.css'
import GoogleAnalytics from './_components/shared/google-analytics'
import { cn } from './_styles/utils'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
})

export const metadata: Metadata = {
  title: 'NOWOO',
  description: '메이플랜드 아이템 검색 사이트',
  applicationName: 'NOWOO',
  keywords: '메이플스토리, 메이플랜드, 아이템, 몬스터',
  creator: 'NOWOO',
  metadataBase: new URL('https://nowoo.kr'),
  alternates: {
    canonical: '/',
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
    title: 'NOWOO',
    description: '메이플랜드 아이템 검색 사이트',
    images: [
      {
        url: 'https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo_og_image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b29fb2dfaW1hZ2UucG5nIiwiaWF0IjoxNzA2MDYxNDIwLCJleHAiOjE4NjM3NDE0MjB9.T8dSKNIZ1czDXzd2j2Em8bw5iq8DMaO199JmM3pNaaU&t=2024-01-24T01%3A57%3A00.419Z',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOWOO',
    description: '메이플랜드 아이템 검색 사이트',
    images: [
      {
        url: 'https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo_og_image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b29fb2dfaW1hZ2UucG5nIiwiaWF0IjoxNzA2MDYxNDIwLCJleHAiOjE4NjM3NDE0MjB9.T8dSKNIZ1czDXzd2j2Em8bw5iq8DMaO199JmM3pNaaU&t=2024-01-24T01%3A57%3A00.419Z',
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
      <body className={cn(pretendard.className, 'min-h-dvh')}>
        <VercelAnalytics />
        <GoogleAnalytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
