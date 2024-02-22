import SearchLayout from "@/app/_components/search-layout";
import { openGraphImage } from "@/app/_constants/open-graph";
import { ROUTES } from "@/app/_constants/routes";
import { getMonsterImage } from "@/app/_lib/utils";
import { prisma } from "@/app/_lib/utils/db";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const monster = await prisma.monster.findFirst({
    where: {
      mapleMobId: Number(params.slug),
    },
    select: {
      nameKor: true,
      descriptionKor: true,
      mapleMobId: true,
    },
  });

  return {
    title: `${monster?.nameKor || "몬스터"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
    description: monster?.descriptionKor || "메이플랜드 아이템 검색 사이트",
    alternates: {
      canonical: `https://nowoo.kr + ${ROUTES.MONSTER(Number(params.slug))}`,
    },
    openGraph: {
      title: `${monster?.nameKor || "몬스터"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: monster?.descriptionKor || "메이플랜드 아이템 검색 사이트",
      url: `https://nowoo.kr + ${ROUTES.MONSTER(Number(params.slug))}`,
      images: [
        {
          url: monster?.mapleMobId ? getMonsterImage(monster.mapleMobId) : openGraphImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${monster?.nameKor || "몬스터"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: monster?.descriptionKor || "메이플랜드 아이템 검색 사이트",
      images: [
        {
          url: monster?.mapleMobId ? getMonsterImage(monster.mapleMobId) : openGraphImage,
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
