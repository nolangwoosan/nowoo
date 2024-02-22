import supabase from "@/shared/api-helpers/supabase";

export async function generateMetadata({ params }: { params: { boardId: string } }) {
  const { data: board } = await supabase
    .from("boards")
    .select("title, description, writer, created_dt")
    .eq("id", params.boardId)
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
