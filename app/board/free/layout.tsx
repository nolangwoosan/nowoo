import { Metadata } from "next";

import SearchLayout from "@/app/_components/search-layout";

export const metadata: Metadata = {
  title: "자유 게시판 - 메이플랜드 아이템 검색 사이트",
  description: "자유 게시판 - 메이플랜드 아이템 검색 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SearchLayout>{children}</SearchLayout>;
}
