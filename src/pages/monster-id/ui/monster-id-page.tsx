import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { prisma } from "@/shared/api-helpers/db";
import { ROUTES } from "@/shared/routes";
import { ItemImage } from "@/widgets/item";
import { MonsterImage } from "@/widgets/monster";

interface Props {
  monsterId: string;
}

export async function MonsterIdPage({ monsterId }: Readonly<Props>) {
  const monster = await prisma.monster.findFirst({
    where: {
      mapleMobId: parseInt(monsterId),
    },
    select: {
      monsterIdx: true,
      mapleMobId: true,
      nameKor: true,
      nameEng: true,
      level: true,
      hp: true,
      mp: true,
      exp: true,
      phAttack: true,
      mgAttack: true,
      phDefence: true,
      mgDefence: true,
      descriptionKor: true,
      isUndead: true,
      views: true,
    },
  });

  if (!monster) notFound();

  await prisma.monster.update({
    where: {
      monsterIdx: monster.monsterIdx,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const dropItems = await prisma.monsterDrop.findMany({
    where: {
      monsterId: monster.monsterIdx,
    },
    select: {
      dropChance: true,
      items: {
        select: {
          itemIdx: true,
          mapleItemId: true,
          nameKor: true,
          nameEng: true,
        },
      },
    },
  });

  return (
    <Fragment>
      <div className="mt-24 flex w-[500px] max-w-full flex-col bg-[#06062C] bg-opacity-50 p-10 text-white shadow-md max-md:p-4">
        <div className="flex w-full flex-col items-center gap-1">
          <h1 className="text-2xl font-semibold">
            {monster.nameKor} (Lv. {monster.level})
          </h1>
          <div>
            <span>{monster.nameEng}</span>
          </div>
        </div>

        <div className="flex gap-12 px-4 py-4">
          <div className="h-fit bg-white p-2">
            <MonsterImage
              monsterId={monster.mapleMobId}
              className="aspect-square object-contain max-md:hidden"
              width={160}
              height={160}
              alt={monster.nameKor}
            />
            <MonsterImage
              monsterId={monster.mapleMobId}
              className="aspect-square object-contain md:hidden"
              width={60}
              height={60}
              alt={monster.nameKor}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[#FF3B3B]">HP : {monster.hp}</span>
              <div className="h-[10px] w-[200px] bg-[#FF3B3B] max-md:w-full" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#1B69FF]">MP : {monster.mp}</span>
              <div className="h-[10px] w-[200px] bg-[#1B69FF] max-md:w-full" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#DFDFDF]">EXP : {monster.exp}</span>
              <div className="h-[10px] w-[200px] bg-[#DFDFDF] max-md:w-full" />
            </div>
          </div>
        </div>

        <div className="mx-4 bg-[#c2c2d1] bg-opacity-25 text-xs">
          <div className="flex border-b border-[#BBB]">
            <div className="flex-1 border-r border-[#BBB] p-2 text-center">공격력</div>
            <div className="flex-1 p-2 text-center">방어력</div>
          </div>
          <div className="flex">
            <div className="grid flex-1 grid-cols-2 justify-between border-r border-[#BBB] p-2">
              <span className="mb-2 flex-1 text-center">물리</span>
              <span className="mb-2 flex-1 text-center">마법</span>
              <span className="flex-1 text-center">{monster.phAttack}</span>
              <span className="flex-1 text-center">{monster.mgAttack}</span>
            </div>
            <div className="grid flex-1 grid-cols-2 justify-between p-2">
              <span className="mb-2 flex-1 text-center">물리</span>
              <span className="mb-2 flex-1 text-center">마법</span>
              <span className="flex-1 text-center">{monster.phDefence}</span>
              <span className="flex-1 text-center">{monster.mgDefence}</span>
            </div>
          </div>
        </div>

        {monster.isUndead && (
          <div
            className="mx-auto mt-8 rounded-md border border-red-700 text-center text-sm text-red-700"
            style={{ width: "100px" }}
          >
            Undead
          </div>
        )}
      </div>

      {dropItems && dropItems.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center gap-5">
          <span className="text-xl font-semibold">드랍 아이템</span>
          {dropItems.map((dropItem) => (
            <Link
              className="flex w-[500px] items-center gap-7 bg-[#06062C] bg-opacity-50 px-8 py-2 max-md:w-full max-md:max-w-[500px]"
              href={ROUTES.ITEM(dropItem.items.mapleItemId)}
              key={dropItem.items.mapleItemId}
            >
              <ItemImage
                itemId={dropItem.items.mapleItemId}
                className="aspect-square object-contain"
                width={70}
                height={70}
                alt={dropItem.items.nameKor}
              />
              <div className="flex flex-col gap-1">
                <span className="text-white">{dropItem.items.nameKor}</span>
                <span className="text-[#FB9E48]">드랍율: {dropItem.dropChance}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
}
