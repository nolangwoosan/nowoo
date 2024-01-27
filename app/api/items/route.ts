import supabase from '@/lib/utils/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  const res = await supabase
    .from('items')
    .select('id, maple_item_id, name_kor')
    .ilike('name_kor', `%${query}%`)
    .limit(5)

  return new Response(JSON.stringify(res))
}
