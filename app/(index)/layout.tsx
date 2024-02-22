import SearchLayout from "@/app/_components/search-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SearchLayout>{children}</SearchLayout>;
}
