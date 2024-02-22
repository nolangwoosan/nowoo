import Link from "next/link";

import { ItemImage } from "@/app/_components/item-image";
import { ROUTES } from "@/app/_constants/routes";
import supabase from "@/app/_lib/utils/supabase";

export default async function PopularItems() {
  const { data: items } = await supabase
    .from("items")
    .select("id, maple_item_id, name_kor")
    .filter("name_kor", "in", '("토비 표창","이블윙즈","뇌전 수리검","노란색 우산","장갑 공격력 주문서 60%")');

  return (
    <div className="flex w-full flex-col gap-8 rounded-md bg-white p-12 shadow-md max-md:gap-4 max-md:p-8">
      <span className="border-b border-[#D8D8D8] pb-4 text-xl font-bold">다른 유저들이 선호하는 아이템</span>
      <div className="flex flex-col gap-4 rounded-sm max-md:gap-2">
        {items?.map((item) => (
          <Link className="flex items-center gap-8" key={item.id} href={ROUTES.ITEM(item.maple_item_id)}>
            <ItemImage
              className="aspect-square object-contain"
              itemId={item.maple_item_id}
              width={60}
              height={60}
              alt={item.name_kor}
            />
            <span>{item.name_kor}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
