'use client'

import Link from 'next/link'
import { useState } from 'react'

import Logo from '@/components/logo'
import { Menu } from '@/components/menu'
import SearchForm from '@/components/search-form'

import { Boards } from './boards'
import { BoardsSkeletonUi } from './boards-skeleton-ui'
import { Pagination } from './pagination'
import { useBoard } from './utils'

const PAGE_SIZE = 10

interface Props {
  searchParams: {
    page?: string
  }
}

export default function Page({ searchParams }: Props) {
  const [currentPage, setCurrentPage] = useState(searchParams.page ? Number(searchParams.page) : 1)
  const boardQuery = useBoard({ page: currentPage, pageSize: PAGE_SIZE })

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className='mx-auto flex max-w-screen-xl flex-col items-center gap-6 p-24 max-lg:px-4 max-lg:py-16'>
      <Logo />
      <Menu />
      <SearchForm />
      <div className='mt-32 w-full max-md:mt-40'>
        <div className='mb-8 flex justify-between max-md:mb-6'>
          <h1 className='text-2xl font-bold max-md:text-xl'>자유게시판</h1>
          <Link
            className='rounded-md bg-[#FB9E48] px-8 py-3 text-xl text-white hover:opacity-70 max-md:px-4 max-md:py-2 max-md:text-base'
            href='/board/free/create'
          >
            등록하기
          </Link>
        </div>
        {boardQuery.isLoading && <BoardsSkeletonUi />}
        {boardQuery.isSuccess && (
          <>
            <Boards boards={boardQuery.data.data ?? []} />
            <Pagination
              itemsPerPage={PAGE_SIZE}
              totalItems={boardQuery.data.count}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </section>
  )
}
