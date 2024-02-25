'use client'

import { SessionProvider } from 'next-auth/react'
import { type PropsWithChildren } from 'react'

import ReactQueryClientProvider from './react-query-client-provider'

export default function CoreProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
    </SessionProvider>
  )
}
