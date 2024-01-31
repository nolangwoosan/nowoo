'use server'

import * as argon2 from 'argon2'

import supabase from '@/lib/utils/supabase'

function getRandom4DigitNumber() {
  const array = new Uint16Array(1)
  crypto.getRandomValues(array)
  const randomNumber = array[0] % 10000
  return String(randomNumber).padStart(4, '0')
}

export async function createBoard({ title, content, password }: { title: string; content: string; password: string }) {
  const response = await supabase.from('boards').insert([
    {
      title,
      description: content,
      writer: `nowoo${getRandom4DigitNumber()}`,
      password: await argon2.hash(password),
    },
  ])

  return response.status === 201
}
