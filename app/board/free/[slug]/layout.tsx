import supabase from "@/app/_lib/utils/supabase";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: board } = await supabase
    .from("boards")
    .select("title, description, writer, created_dt")
    .eq("id", params.slug)
    .single();

  return {
    title: `${board?.title || "자유 게시판"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
