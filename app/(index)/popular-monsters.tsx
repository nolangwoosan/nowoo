import Link from "next/link";

import { MonsterImage } from "@/app/_components/monster-image";
import { ROUTES } from "@/app/_constants/routes";
import supabase from "@/app/_lib/utils/supabase";

export default async function PopularMonsters() {
  const { data: monsters } = await supabase
    .from("monsters")
    .select("id, maple_mob_id, name_kor")
    .filter("name_kor", "in", '("쿨리 좀비","루나픽시","주니어 그류핀","레드 드레이크","라이칸스로프")')
    .limit(5);

  return (
    <div className="flex w-full flex-col gap-8 rounded-md bg-white p-12 shadow-md max-md:gap-4 max-md:p-8">
      <span className="border-b border-[#D8D8D8] pb-4 text-xl font-bold">인기 몬스터</span>
      <div className="flex flex-col gap-4 rounded-sm max-md:gap-2">
        {monsters?.map((monster) => (
          <Link className="flex items-center gap-8" key={monster.id} href={ROUTES.MONSTER(monster.maple_mob_id)}>
            <MonsterImage
              monsterId={monster.maple_mob_id}
              className="aspect-square object-contain"
              width={60}
              height={60}
              alt={monster.name_kor}
            />
            <span>{monster.name_kor}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
