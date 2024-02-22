import SearchLayout from "@/app/_components/search-layout";
import { openGraphImage } from "@/app/_constants/open-graph";
import { ROUTES } from "@/app/_constants/routes";
import { getItemImage } from "@/app/_lib/utils";
import { prisma } from "@/app/_lib/utils/db";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await prisma.item.findFirst({
    where: {
      mapleItemId: Number(params.slug),
    },
    select: {
      nameKor: true,
      descriptionKor: true,
      mapleItemId: true,
    },
  });

  return {
    title: `${item?.nameKor || "아이템"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
    description: item?.descriptionKor || "메이플랜드 아이템 검색 사이트",
    alternates: {
      canonical: `https://nowoo.kr + ${ROUTES.ITEM(Number(params.slug))}`,
    },
    openGraph: {
      title: `${item?.nameKor || "아이템"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: item?.descriptionKor || "메이플랜드 아이템 검색 사이트",
      url: `https://nowoo.kr + ${ROUTES.ITEM(Number(params.slug))}`,
      images: [
        {
          url: item?.mapleItemId ? getItemImage(item.mapleItemId) : openGraphImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item?.nameKor || "아이템"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: item?.descriptionKor || "메이플랜드 아이템 검색 사이트",
      images: [
        {
          url: item?.mapleItemId ? getItemImage(item.mapleItemId) : openGraphImage,
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
