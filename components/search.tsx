import { Suspense } from 'react'

import supabase from '@/lib/utils/supabase'

import SearchBar from './search-bar'
import SearchResult from './search-result'

interface Props {
  query: string
}

export default async function Search({ query }: Readonly<Props>) {
  const isMatchedResultExist: boolean = await supabase
    .from('items')
    .select('id')
    .ilike('name_kor', `%${query}%`)
    .limit(1)
    .then((response) => Boolean(response.data?.length))

  return (
    <div className='relative flex w-[600px] justify-center max-sm:w-full'>
      <SearchBar isMatchedResultExist={Boolean(query) && isMatchedResultExist} />
      <Suspense>
        <SearchResult searchQuery={query} />
      </Suspense>
    </div>
  )
}
