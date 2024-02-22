import SearchLayout from "@/app/_components/search-layout";
import { openGraphImage } from "@/app/_constants/open-graph";
import { ROUTES } from "@/app/_constants/routes";
import { getItemImage } from "@/app/_lib/utils";
import supabase from "@/app/_lib/utils/supabase";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: item } = await supabase
    .from("items")
    .select("name_kor, description_kor, maple_item_id")
    .match({
      maple_item_id: params.slug,
    })
    .single();

  return {
    title: `${item?.name_kor || "아이템"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
    description: item?.description_kor || "메이플랜드 아이템 검색 사이트",
    alternates: {
      canonical: `https://nowoo.kr + ${ROUTES.ITEM(Number(params.slug))}`,
    },
    openGraph: {
      title: `${item?.name_kor || "아이템"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: item?.description_kor || "메이플랜드 아이템 검색 사이트",
      url: `https://nowoo.kr + ${ROUTES.ITEM(Number(params.slug))}`,
      images: [
        {
          url: item?.maple_item_id ? getItemImage(item.maple_item_id) : openGraphImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item?.name_kor || "아이템"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: item?.description_kor || "메이플랜드 아이템 검색 사이트",
      images: [
        {
          url: item?.maple_item_id ? getItemImage(item.maple_item_id) : openGraphImage,
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SearchLayout>{children}</SearchLayout>;
}
