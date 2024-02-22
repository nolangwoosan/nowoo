"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/shared/api-helpers";

import { useBoard } from "../lib/use-board";
import { Board } from "./board";
import { BoardsSkeletonUi } from "./board-skeleton-ui";
import { Pagination } from "./pagination";

const PAGE_SIZE = 10;

interface Props {
  page: string | undefined;
}

const tabs = [
  { id: "all", name: "전체 글" },
  // { id: 'trade', name: '거래 글' },
];

type Tab = (typeof tabs)[number];

export function FreeBoardPage({ page }: Readonly<Props>) {
  const [currentTab, setCurrentTab] = useState<Tab["id"]>(tabs[0].id);
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const boardQuery = useBoard({ page: currentPage, pageSize: PAGE_SIZE });

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-24 w-full">
      <Tabs.Root defaultValue={tabs[0].id} value={currentTab} onValueChange={setCurrentTab}>
        <div className="mb-2 flex items-end justify-between">
          <Tabs.List className="flex gap-2">
            {tabs.map((tab) => (
              <Tabs.Trigger
                className={cn(
                  "rounded-md border border-gray-600 px-4 py-2 text-gray-600",
                  tab.id === currentTab && "border-none bg-[#FB9E48] text-white",
                )}
                type="button"
                key={tab.id}
                value={tab.id}
              >
                {tab.name} ({boardQuery.data?.count ?? 0})
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Link
            className="flex h-fit items-center gap-2 rounded-md border border-[#FB9E48] px-4 py-2 text-[#FB9E48] hover:opacity-70"
            href="/board/free/create"
          >
            <Pencil size={20} />
            <span>글쓰기</span>
          </Link>
        </div>

        <Tabs.Content value={tabs[0].id}>
          {boardQuery.isLoading && <BoardsSkeletonUi />}
          {boardQuery.isSuccess && (
            <>
              <Board boards={boardQuery.data.data ?? []} />
              <Pagination
                itemsPerPage={PAGE_SIZE}
                totalItems={boardQuery.data.count}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Tabs.Content>
        {/* <Tabs.Content value={tabs[1].id}>
          {boardQuery.isLoading && <BoardsSkeletonUi />}
          {boardQuery.isSuccess && (
            <>
              <Boards boards={boardQuery.data.data ?? []} />
              <Pagination
                itemsPerPage={PAGE_SIZE}
                totalItems={boardQuery.data.count}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Tabs.Content> */}
      </Tabs.Root>
    </div>
  );
}
