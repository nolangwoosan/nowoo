import dayjs from 'dayjs'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Logo from '@/components/logo'
import { Menu } from '@/components/menu'
import SearchForm from '@/components/search-form'
import { ROUTES } from '@/constants/routes'
import supabase from '@/lib/utils/supabase'

import { DeleteButton } from './delete-button'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: Props) {
  const { data: board } = await supabase
    .from('boards')
    .select('title, description, writer, created_dt')
    .eq('id', slug)
    .single()

  if (!board) notFound()

  return (
    <section className='mx-auto flex max-w-screen-xl flex-col items-center gap-6 p-24 max-lg:px-4 max-lg:py-16'>
      <Logo />
      <Menu />
      <SearchForm />
      <div className='mb-8 mt-32 min-h-[500px] w-full bg-white p-5'>
        <div className='mb-7 flex items-end justify-between border-b border-[#D8D8D8] pb-5'>
          <div className='flex flex-col gap-5'>
            <span className='font-bold'>{board.title}</span>
            <span className='text-[#999]'>{dayjs(board.created_dt).format('YYYY.MM.DD HH:mm')}</span>
          </div>
          <span className='text-[#999]'>{board.writer}</span>
        </div>
        <p className='text-[#999]'>{board.description}</p>
      </div>
      <div className='flex w-full items-center justify-between'>
        <div className='flex gap-5'>
          <DeleteButton slug={slug} />
          {/* <button className='rounded-md border border-[#999] px-10 py-3 text-[#999]'>수정</button> */}
        </div>
        <Link className='rounded-md bg-[#FB9E48] px-12 py-4 text-white' href={ROUTES.FREE_BOARD.LIST}>
          목록
        </Link>
      </div>
    </section>
  )
}
