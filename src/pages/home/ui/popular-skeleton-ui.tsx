interface Props {
  title: string
}

export function PopularSkeletonUI({ title }: Readonly<Props>) {
  return (
    <div className='flex w-full flex-col gap-8 rounded-md bg-white p-12 shadow-md max-md:gap-4 max-md:p-8'>
      <span className='animate-pulse border-b border-gray-300 pb-4 text-xl font-bold'>{title}</span>
      <div className='flex flex-col gap-4 rounded-sm max-md:gap-2'>
        {new Array(5).fill(null).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className='flex animate-pulse items-center gap-4'>
            <div className='aspect-square h-16 w-16 rounded-full bg-gray-300' />
            <span className='h-8 w-full bg-gray-300' />
          </div>
        ))}
      </div>
    </div>
  )
}
