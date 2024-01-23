import supabase from '@/app/_lib/utils/supabase'

export const getItems = async () => {
  const items = await supabase.from('items').select()
  return items
}

export const getItemImage = (id: number) => {
  return `http://maplestory.io/api/gms/62/item/${id}/icon?resize=3`
}
