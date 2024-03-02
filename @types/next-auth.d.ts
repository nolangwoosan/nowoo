// biome-ignore lint/nursery/noUnusedImports: <explanation>
import NextAuth, { Session } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name?: string
      email?: string
      image?: string
    }
  }
}
