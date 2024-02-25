import { getServerSession as getServerSessionByNextAuth } from 'next-auth/next'

import { authOptions } from '@/entities/auth'
import { useSession as useSessionByNextAuth } from 'next-auth/react'

export const getServerSession = () => getServerSessionByNextAuth(authOptions)
export const useSession = () => useSessionByNextAuth()
