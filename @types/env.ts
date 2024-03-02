import { Input, object, parse, string } from 'valibot'

const envVariables = object({
  DATABASE_URL: string('DATABASE_URL'),
  KAKAO_CLIENT_ID: string('KAKAO_CLIENT_ID'),
  KAKAO_CLIENT_SECRET: string('KAKAO_CLIENT_SECRET'),
  NEXTAUTH_SECRET: string('NEXTAUTH_SECRET'),
  DISCORD_CLIENT_ID: string('DISCORD_CLIENT_ID'),
  DISCORD_CLIENT_SECRET: string('DISCORD_CLIENT_SECRET'),
  GOOGLE_CLIENT_ID: string('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: string('GOOGLE_CLIENT_SECRET'),
  EMAIL_SERVER_HOST: string('EMAIL_SERVER_HOST'),
  EMAIL_SERVER_PORT: string('EMAIL_SERVER_PORT'),
  EMAIL_SERVER_USER: string('EMAIL_SERVER_USER'),
  EMAIL_SERVER_PASSWORD: string('EMAIL_SERVER_PASSWORD'),
  EMAIL_FROM: string('EMAIL_FROM'),
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
      EMAIL_SERVER_HOST: string
      EMAIL_SERVER_PORT: string
      EMAIL_SERVER_USER: string
      EMAIL_SERVER_PASSWORD: string
      EMAIL_FROM: string
    }
  }
}
