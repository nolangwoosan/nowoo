import Link from "next/link";

import { MonsterImage } from "@/app/_components/monster-image";
import { ROUTES } from "@/app/_constants/routes";
import { prisma } from "@/app/_lib/utils/db";

export default async function PopularMonsters() {
  const monsters = await prisma.monster.findMany({
    where: {
      nameKor: {
        in: ["쿨리 좀비", "루나픽시", "주니어 그류핀", "레드 드레이크", "라이칸스로프"],
      },
    },
    take: 5,
    select: {
      monsterIdx: true,
      mapleMobId: true,
      nameKor: true,
    },
  });

  return (
    <div className="flex w-full flex-col gap-8 rounded-md bg-white p-12 shadow-md max-md:gap-4 max-md:p-8">
      <span className="border-b border-[#D8D8D8] pb-4 text-xl font-bold">인기 몬스터</span>
      <div className="flex flex-col gap-4 rounded-sm max-md:gap-2">
        {monsters?.map(({ monsterIdx, mapleMobId, nameKor }) => (
          <Link className="flex items-center gap-8" key={monsterIdx} href={ROUTES.MONSTER(mapleMobId)}>
            <MonsterImage
              monsterId={mapleMobId}
              className="aspect-square object-contain"
              width={60}
              height={60}
              alt={nameKor}
            />
            <span>{nameKor}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
