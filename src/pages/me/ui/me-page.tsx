import { ROUTES } from '@/shared/routes'
import { Logo } from '@/widgets/logo'
import { redirect } from 'next/navigation'
import { getServerSession } from 'src/entities/auth'
import { prisma } from 'src/shared/helpers/db'

export async function MePage() {
  const session = await getServerSession()

  if (!session) redirect(ROUTES.HOME)

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      gameNick: true,
      gameTcNick: true,
      gameLevel: true,
      gameJob: true,
      role: true,
      coin: true,
      createdDt: true,
    },
    where: {
      id: Number(session.sub),
    },
  })

  console.log('user', user)

  return (
    <div className='flex justify-center items-center flex-col gap-4 py-20'>
      <form className='flex flex-col gap-2 mb-4 p-8 border border-gray-300 rounded-lg shadow-md'>
        <div className='mb-4 flex justify-center'>
          <Logo />
        </div>
        <label className='flex flex-col gap-1 w-80' htmlFor='email'>
          <span className='font-medium'>이메일</span>
          <input className='border border-gray-300 rounded-md p-2' type='text' placeholder='nowoo@example.com' />
        </label>
        <label className='flex flex-col gap-1' htmlFor='password'>
          <span className='font-medium'>비밀번호</span>
          <input className='border border-gray-300 rounded-md p-2' type='password' />
        </label>
        <button className='bg-gray-900 text-white rounded-md p-2 mt-4' type='submit'>
          로그인
        </button>
      </form>
    </div>
  )
}
