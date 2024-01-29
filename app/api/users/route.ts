import supabase from '@/lib/utils/supabase'

export async function POST(request: Request) {
  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For') ||
    request.headers.get('X-Real-IP') ||
    request.headers.get('Remote_Addr') ||
    request.headers.get('CF-IPCountry')
  const userAgent = request.headers.get('User-Agent')

  await supabase.from('user_access').upsert([
    {
      ip,
      agent: userAgent,
    },
  ])

  return new Response(
    JSON.stringify({
      result: true,
    })
  )
}
