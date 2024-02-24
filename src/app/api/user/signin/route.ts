import { prisma } from '@/shared/helpers/db'

import argon2 from 'argon2'

interface RequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  const requestBody: RequestBody = await request.json()

  console.log(requestBody)

  const user = await prisma.user.findFirst({
    where: {
      email: requestBody.email,
    },
  })

  console.log(user)

  if (!user) {
    return new Response(
      JSON.stringify({
        message: '일치하는 정보가 없습니다.',
      })
    )
  }

  const passwordValid = await argon2.verify(user.password, requestBody.password)

  if (!passwordValid) {
    return new Response(
      JSON.stringify({
        message: '일치하는 정보가 없습니다.',
      })
    )
  }

  return new Response(
    JSON.stringify({
      message: '로그인이 완료되었습니다.',
      data: {
        userIdx: user.userIdx,
      },
    })
  )
}
