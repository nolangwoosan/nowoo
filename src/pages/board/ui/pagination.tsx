import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/shared/api-helpers'

interface Props {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  paginate: (pageNumber: number) => void
}

export function Pagination({ itemsPerPage, totalItems, currentPage, paginate }: Props) {
  const pathname = usePathname()
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pageRange = 5

  const getPageNumbers = (): number[] => {
    const midPoint = Math.floor(pageRange / 2)
    let startPage: number
    let endPage: number

    if (totalPages <= pageRange) {
      startPage = 1
      endPage = totalPages
    } else if (currentPage <= midPoint) {
      startPage = 1
      endPage = pageRange
    } else if (currentPage + midPoint >= totalPages) {
      startPage = totalPages - pageRange + 1
      endPage = totalPages
    } else {
      startPage = currentPage - midPoint
      endPage = currentPage + midPoint
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const handleClick = (pageNumber: number) => {
    paginate(pageNumber)
  }

  return (
    <div className='mt-8 flex justify-center gap-2'>
      <Link
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border border-[#999] text-[#999] hover:opacity-70 max-md:h-8 max-md:w-8 max-md:text-sm'
        )}
        href={{
          pathname,
          query: {
            page: 1,
          },
        }}
        onClick={() => handleClick(1)}
      >
        <ChevronsLeft />
      </Link>
      {getPageNumbers().map((number) => (
        <Link
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-md border border-[#999] text-[#999] hover:opacity-70 max-md:h-8 max-md:w-8 max-md:text-sm',
            currentPage === number && 'border-none bg-[#FB9E48] text-white'
          )}
          key={number}
          href={{
            pathname,
            query: {
              page: number,
            },
          }}
          onClick={() => handleClick(number)}
        >
          {number}
        </Link>
      ))}
      <Link
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border border-[#999] text-[#999] hover:opacity-70 max-md:h-8 max-md:w-8 max-md:text-sm'
        )}
        href={{
          pathname,
          query: {
            page: totalPages,
          },
        }}
        onClick={() => handleClick(totalPages)}
      >
        <ChevronsRight />
      </Link>
    </div>
  )
}
