import Link from "next/link";

import { Logo } from "@/widgets/search";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100dvh-200px)] flex-col items-center justify-center gap-2">
      <Logo />
      <h2 className="text-2xl font-bold">존재하지 않는 페이지에요.</h2>
      <Link className="text-blue-500 hover:underline" href="/">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
