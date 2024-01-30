'use server'

import * as argon2 from 'argon2'

import supabase from '@/lib/utils/supabase'

export async function createBoard({ title, content, password }: { title: string; content: string; password: string }) {
  const response = await supabase.from('boards').insert([
    {
      title,
      description: content,
      writer: 'nowoo' + Math.floor(Math.random() * 10000),
      password: await argon2.hash(password),
    },
  ])

  return response.status === 201
}
