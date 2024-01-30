import supabase from '@/lib/utils/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('pageSize')) || 10

  if (Number.isNaN(page)) {
    return new Response('page is not a number', { status: 400 })
  }

  const offset = (page - 1) * pageSize

  const response = await supabase
    .from('boards')
    .select('id, title, writer, created_dt', {
      count: 'exact',
    })
    .order('created_dt', { ascending: false })
    .range(offset, offset + pageSize - 1)
    .is('deleted_dt', null)

  return new Response(JSON.stringify(response))
}
