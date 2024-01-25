import { Loader2 } from 'lucide-react'

export default function SearchResultLoader() {
  return (
    <div className='absolute top-full z-10 flex min-h-12 w-full items-center justify-center rounded-b-[30px] bg-white shadow-md'>
      <Loader2 className='animate-spin' />
    </div>
  )
}
