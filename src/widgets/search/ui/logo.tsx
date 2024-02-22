import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/shared/routes";

export function Logo() {
  return (
    <Link className="flex items-center gap-2" href={ROUTES.HOME}>
      <Image
        className="max-md:hidden"
        src="https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo_logo(beta).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b29fbG9nbyhiZXRhKS5wbmciLCJpYXQiOjE3MDY1MDExMzYsImV4cCI6MTg2NDE4MTEzNn0.gg0CUXBrObRSDhCg9bB_N3wRbxe2O8iYrsbntj7zGf8&t=2024-01-29T04%3A05%3A36.383Z"
        width={240}
        height={70}
        alt="logo"
        priority
      />
      <Image
        className="md:hidden"
        src="https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo_logo_mobile(beta).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b29fbG9nb19tb2JpbGUoYmV0YSkucG5nIiwiaWF0IjoxNzA2NTAwOTQwLCJleHAiOjE4NjQxODA5NDB9.McCmR1dzleG7XqqAaENGMh9ExUskTHu6Nj9Vu_-u7uY&t=2024-01-29T04%3A02%3A20.743Z"
        width={150}
        height={57}
        alt="logo"
        priority
      />
      <Image
        src="https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b28ucG5nIiwiaWF0IjoxNzA2MDYyNTk1LCJleHAiOjE4NjM3NDI1OTV9.5OtMLfKfKu9_e0SafJ4m1VoQpkiJhrmzSBO0ttx4T0o&t=2024-01-24T02%3A16%3A35.331Z"
        width={50}
        height={50}
        alt="nowoo"
      />
    </Link>
  );
}
