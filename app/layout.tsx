import { Inter } from 'next/font/google'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

import '@/app/_styles/globals.css'
import GoogleAnalytics from './_components/shared/google-analytics'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <VercelAnalytics />
        <GoogleAnalytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
