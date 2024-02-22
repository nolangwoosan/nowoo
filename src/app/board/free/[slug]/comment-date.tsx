"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  createdAt: string;
}

export function CommentDate({ createdAt }: Readonly<Props>) {
  return <span className="text-sm text-gray-400">{dayjs(createdAt).tz().format("YYYY.MM.DD HH:mm")}</span>;
}
