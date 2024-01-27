import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

export default function Logo() {
  return (
    <Link className='flex items-center gap-2' href={ROUTES.HOME}>
      <Image
        src='https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo_logo-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b29fbG9nby1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTcwNjA2MjUzMywiZXhwIjoxODYzNzQyNTMzfQ.SlP8E0TSx0Usuo42VsNevsKA7bLTH-ih-IR-g6vstJ0&t=2024-01-24T02%3A15%3A33.259Z'
        width={240}
        height={70}
        alt='logo'
        priority
      />
      <Image
        src='https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b28ucG5nIiwiaWF0IjoxNzA2MDYyNTk1LCJleHAiOjE4NjM3NDI1OTV9.5OtMLfKfKu9_e0SafJ4m1VoQpkiJhrmzSBO0ttx4T0o&t=2024-01-24T02%3A16%3A35.331Z'
        width={50}
        height={50}
        alt='nowoo'
      />
    </Link>
  )
}
