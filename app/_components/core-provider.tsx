"use client";

import { type PropsWithChildren } from "react";

import ReactQueryClientProvider from "./react-query-client-provider";

export default function CoreProvider({ children }: Readonly<PropsWithChildren>) {
  return <ReactQueryClientProvider>{children}</ReactQueryClientProvider>;
}
