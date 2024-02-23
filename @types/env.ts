import { Input, object, parse, string } from 'valibot'

const envVariables = object({
  DATABASE_URL: string('DATABASE_URL'),
})

parse(envVariables, process.env)

console.log(process.env.DATABASE_URL)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Input<typeof envVariables> {
      DATABASE_URL: string
    }
  }
}
