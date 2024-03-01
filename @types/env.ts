import { Input, object, parse, string } from 'valibot'

const envVariables = object({
  DATABASE_URL: string('DATABASE_URL'),
  KAKAO_CLIENT_ID: string('KAKAO_CLIENT_ID'),
  KAKAO_CLIENT_SECRET: string('KAKAO_CLIENT_SECRET'),
  NEXTAUTH_SECRET: string('NEXTAUTH_SECRET'),
})

parse(envVariables, process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Input<typeof envVariables> {
      DATABASE_URL: string
      NEXTAUTH_SECRET: string
      KAKAO_CLIENT_ID: string
      KAKAO_CLIENT_SECRET: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
    }
  }
}
