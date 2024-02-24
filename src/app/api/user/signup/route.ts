import { prisma } from '@/shared/helpers/db'
import argon2 from 'argon2'

interface RequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  const requestBody: RequestBody = await request.json()

  if (!requestBody.email) {
    return new Response(
      JSON.stringify({
        message: '이메일을 입력해주세요.',
      })
    )
  }

  if (!requestBody.password) {
    return new Response(
      JSON.stringify({
        message: '비밀번호를 입력해주세요.',
      })
    )
  }

  const user = await prisma.user.create({
    data: {
      gameNick: 'test',
      gameTcNick: 'test',
      email: requestBody.email,
      password: await argon2.hash(requestBody.password),
    },
  })

  return new Response(
    JSON.stringify({
      message: '회원가입이 완료되었습니다.',
      data: {
        userIdx: user.userIdx,
      },
    })
  )
}
