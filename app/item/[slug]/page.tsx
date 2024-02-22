import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { ItemImage } from "@/app/_components/item-image";
import { MonsterImage } from "@/app/_components/monster-image";
import { ROUTES } from "@/app/_constants/routes";
import { cn } from "@/app/_lib/utils";
import { prisma } from "@/app/_lib/utils/db";

interface Props {
  params: {
    slug: string;
  };
}

const JOB: Record<number, string[]> = {
  0: ["초보자"],
  1: ["전사"],
  2: ["마법사"],
  3: ["전사", "마법사"],
  4: ["궁수"],
  8: ["도적"],
  9: ["전사", "도적"],
} as const;

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = params;

  const item = await prisma.item.findFirst({
    where: {
      mapleItemId: Number(slug),
    },
    select: {
      itemIdx: true,
      mapleItemId: true,
      nameKor: true,
      reqLevel: true,
      reqStr: true,
      reqDex: true,
      reqInt: true,
      reqLuk: true,
      reqPop: true,
      reqJob: true,
      incPhAttack: true,
      incMgAttack: true,
      incPhDefence: true,
      incMgDefence: true,
      incStr: true,
      incDex: true,
      incInt: true,
      incLuk: true,
      incHp: true,
      incMp: true,
      upgradableCount: true,
      priceShop: true,
      priceAverage: true,
      overallCategory: true,
      views: true,
    },
  });

  if (!item) notFound();

  await prisma.item.update({
    where: {
      itemIdx: item.itemIdx,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const dropMonsters = await prisma.monsterDrop.findMany({
    where: {
      itemId: item.itemIdx,
    },
    select: {
      dropChance: true,
      monsters: {
        select: {
          monsterIdx: true,
          mapleMobId: true,
          nameKor: true,
          nameEng: true,
        },
      },
    },
  });

  return (
    <Fragment>
      <div className="mt-24 flex w-[500px] max-w-full flex-col bg-[#06062C] bg-opacity-50 px-2 pb-5 text-white shadow-md">
        <div className="mt-5 flex w-full flex-col items-center gap-1 p-2">
          <h1 className="text-3xl font-semibold">{item.nameKor}</h1>
        </div>

        <div className="flex gap-12 px-4 py-4 max-md:gap-8">
          <div className="h-fit bg-white bg-opacity-30 p-2">
            <ItemImage
              itemId={item.mapleItemId}
              className="aspect-square object-contain max-md:hidden"
              width={160}
              height={160}
              alt={item.nameKor}
            />
            <ItemImage
              itemId={item.mapleItemId}
              className="aspect-square object-contain md:hidden"
              width={80}
              height={80}
              alt={item.nameKor}
            />
          </div>
          <div className="flex flex-col">
            <span className="mb-2 text-sm">REQ LEV : {item.reqLevel}</span>
            <span className="mb-2 text-sm">REQ STR : {item.reqStr}</span>
            <span className="mb-2 text-sm">REQ DEX : {item.reqDex}</span>
            <span className="mb-2 text-sm">REQ INT : {item.reqInt}</span>
            <span className="mb-2 text-sm">REQ LUK : {item.reqLuk}</span>
            <span className="mb-2 text-sm">REQ POP : {item.reqPop}</span>
          </div>
        </div>

        <div className="mb-5 flex justify-center gap-14 border-b-2 border-b-white pb-2 max-md:gap-4">
          {["초보자", "전사", "마법사", "궁수", "도적"].map((job) => (
            <span
              key={job}
              className={cn("text-lg", item.reqJob !== 0 && !JOB[item.reqJob].includes(job) && "text-red-500")}
            >
              {job}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-10 px-4">
          <div className="flex flex-col gap-1">
            {Boolean(item.incPhAttack) && (
              <span>
                물리공격력 : +{item.incPhAttack}{" "}
                {item.overallCategory === "Equip" && `(${item.incPhAttack - 5} ~ ${item.incPhAttack + 5})`}
              </span>
            )}
            {Boolean(item.incMgAttack) && (
              <span>
                마법공격력 : +{item.incMgAttack}{" "}
                {item.overallCategory === "Equip" && `(${item.incMgAttack - 5} ~ ${item.incMgAttack + 5})`}
              </span>
            )}
            {Boolean(item.incPhDefence) && <span>물리방어력 : +{item.incPhDefence}</span>}
            {Boolean(item.incMgDefence) && <span>마법방어력 : +{item.incMgDefence}</span>}
            {Boolean(item.incStr) && <span>STR : +{item.incStr}</span>}
            {Boolean(item.incDex) && <span>DEX : +{item.incDex}</span>}
            {Boolean(item.incInt) && <span>INT : +{item.incInt}</span>}
            {Boolean(item.incLuk) && <span>LUK : +{item.incLuk}</span>}
            {Boolean(item.incHp) && <span>HP : +{item.incHp}</span>}
            {Boolean(item.incMp) && <span>MP : +{item.incMp}</span>}
            <span>업그레이드 가능 횟수 : {item.upgradableCount}</span>
            <span>상점 거래가 : {item.priceShop.toLocaleString()} 메소</span>
            <span>거래 시세가 : {item.priceAverage ? `${item.priceAverage} 메소` : "데이터 준비중입니다."}</span>
          </div>
        </div>
      </div>

      {dropMonsters && dropMonsters.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center gap-5">
          <span className="text-xl font-semibold">드랍 몬스터</span>
          {dropMonsters.map((dropMonster) => (
            <Link
              className="flex w-[500px] items-center gap-7 bg-[#06062C] bg-opacity-50 px-8 py-2 max-md:w-full max-md:max-w-[500px]"
              href={ROUTES.MONSTER(dropMonster.monsters.mapleMobId)}
              key={dropMonster.monsters.mapleMobId}
            >
              <MonsterImage
                monsterId={dropMonster.monsters.mapleMobId}
                className="aspect-square object-contain"
                width={70}
                height={70}
                alt={dropMonster.monsters.nameKor}
              />
              <div className="flex flex-col gap-1">
                <span className="text-white">{dropMonster.monsters.nameKor}</span>
                <span className="text-[#FB9E48]">드랍율: {dropMonster.dropChance}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
}
