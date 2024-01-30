'use server'

import * as argon2 from 'argon2'
import { revalidatePath } from 'next/cache'

import supabase from '@/lib/utils/supabase'

export const deleteBoard = async ({ slug, password }: { slug: string; password: string }) => {
  const board = await supabase.from('boards').select('id, password').eq('id', Number(slug)).single()

  if (!board.data) {
    return {
      status: 404,
      body: JSON.stringify({ message: 'board is not found' }),
    }
  }

  const isPasswordValid = await argon2.verify(board.data.password, password)

  if (!isPasswordValid) {
    return {
      status: 401,
      body: JSON.stringify({ message: 'password is not valid' }),
    }
  }

  const response = await supabase
    .from('boards')
    .update({ id: Number(slug), deleted_dt: new Date().toUTCString() })
    .match({ id: Number(slug) })

  console.log(response)

  revalidatePath('/board/free')

  return {
    status: 200,
    body: JSON.stringify({ message: 'success' }),
  }
}
