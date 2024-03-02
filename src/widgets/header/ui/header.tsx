import { getServerSession } from '@/entities/auth'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from 'src/shared/routes'
import { SignOutButton } from './sign-out-button'

export async function Header() {
  const session = await getServerSession()

  return (
    <header className='sticky bg-gray-300 w-full z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200'>
      <div className='px-4 py-3 flex justify-end'>
        {session ? (
          <div className='flex items-center gap-2'>
            <Link className='flex items-center gap-1 border border-gray-300 rounded-md px-2 h-9' href={ROUTES.ME}>
              <Image
                className='rounded-full border border-gray-300'
                src={
                  session.user.image ??
                  'https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b28ucG5nIiwiaWF0IjoxNzA2MDYyNTk1LCJleHAiOjE4NjM3NDI1OTV9.5OtMLfKfKu9_e0SafJ4m1VoQpkiJhrmzSBO0ttx4T0o&t=2024-01-24T02%3A16%3A35.331Z'
                }
                width={24}
                height={24}
                alt='user profile'
              />
              <span className='text-sm'>{session.user.name}</span>
            </Link>
            <SignOutButton />
          </div>
        ) : (
          <Link
            className='flex justify-center items-center px-4 h-9 bg-gray-900 rounded-md text-white text-sm'
            href={ROUTES.SIGN_IN}
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  )
}
