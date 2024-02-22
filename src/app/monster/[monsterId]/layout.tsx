import { getMonsterImage } from "@/shared/api-helpers";
import { prisma } from "@/shared/api-helpers/db";
import { ROUTES } from "@/shared/routes";
import { openGraphImage } from "@/shared/ui/open-graph";
import { SearchLayout } from "@/widgets/search/ui/search-layout";

export async function generateMetadata({ params }: { params: { monsterId: string } }) {
  const monster = await prisma.monster.findFirst({
    where: {
      mapleMobId: Number(params.monsterId),
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
      canonical: `https://nowoo.kr + ${ROUTES.MONSTER(Number(params.monsterId))}`,
    },
    openGraph: {
      title: `${monster?.nameKor || "몬스터"} | NOWOO - 메이플랜드 아이템 검색 사이트`,
      description: monster?.descriptionKor || "메이플랜드 아이템 검색 사이트",
      url: `https://nowoo.kr + ${ROUTES.MONSTER(Number(params.monsterId))}`,
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
