import supabase from '@/app/_lib/utils/supabase'

export const getItems = async () => {
  const { data: items } = await supabase.from('items').select()
  return items ?? []
}

export const getMonsters = async () => {
  const { data: monsters } = await supabase.from('monsters').select()
  return monsters ?? []
}

export const getItemImage = (id: number) => {
  return `http://maplestory.io/api/gms/62/item/${id}/icon?resize=3`
}

export const getMonsterImage = (id: number) => {
  return `http://maplestory.io/api/gms/62/mob/animated/${id}/move`
}
