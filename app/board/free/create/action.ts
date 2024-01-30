'use server'

import * as argon2 from 'argon2'

import supabase from '@/lib/utils/supabase'

export async function createBoard({
  title,
  content,
  writer,
  password,
}: {
  title: string
  content: string
  writer: string
  password: string
}) {
  const response = await supabase.from('boards').insert([
    {
      title,
      description: content,
      writer,
      password: await argon2.hash(password),
    },
  ])

  return response.status === 201
}
