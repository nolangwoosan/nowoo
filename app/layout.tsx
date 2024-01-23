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
  title: 'Mapleland',
  description: 'Hello, Mapleland!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(pretendard.className, 'min-h-dvh')}>
        <VercelAnalytics />
        <GoogleAnalytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
