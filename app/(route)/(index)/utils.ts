import { cache } from 'react'

import supabase from '@/app/_lib/utils/supabase'

export const getItems = cache(async () => {
  const { data: items } = await supabase.from('items').select()
  return items
})

export const getItemImage = (id: number) => {
  return `http://maplestory.io/api/gms/62/item/${id}/icon?resize=3`
}
