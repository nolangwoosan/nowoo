import argon2 from 'argon2'

import { prisma } from '@/shared/helpers/db'
interface RequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  const requestBody: RequestBody = await request.json()

  if (!requestBody.email) {
    return new Response(
      JSON.stringify({
        message: '이메일은 필수 요청값입니다.',
      }),
      {
        status: 400,
      }
    )
  }

  if (!requestBody.password) {
    return new Response(
      JSON.stringify({
        message: '비밀번호는 필수 요청값입니다.',
      }),
      {
        status: 400,
      }
    )
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: requestBody.email,
    },
  })

  if (isUserExist) {
    return new Response(
      JSON.stringify({
        message: '이미 존재하는 이메일입니다.',
      }),
      {
        status: 400,
      }
    )
  }

  const user = await prisma.user.create({
    data: {
      email: requestBody.email,
      password: await argon2.hash(requestBody.password),
    },
  })

  return new Response(
    JSON.stringify({
      message: '회원가입이 완료되었습니다.',
      data: {
        userId: user.id,
      },
    })
  )
}
