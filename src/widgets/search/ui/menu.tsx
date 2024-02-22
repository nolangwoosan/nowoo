"use client";

import Link from "next/link";

import { ROUTES } from "@/shared/routes";

export function Menu() {
  return (
    <div className="flex">
      <Link className="border-r border-[#BCBCBC] px-6 max-md:px-4" href={ROUTES.FREE_BOARD.LIST}>
        자유게시판
      </Link>
      <a
        className="border-r border-[#BCBCBC] px-6 max-md:px-4"
        href="https://discord.gg/mapleland"
        target="_blank"
        rel="noreferrer"
      >
        Discord
      </a>
      <a
        className="px-4"
        href="https://maplestoryworlds.nexon.com/ko/play/be146ee19f5247d18c13834ec29eef09/"
        target="_blank"
        rel="noreferrer"
      >
        Mapleland
      </a>
    </div>
  );
}
