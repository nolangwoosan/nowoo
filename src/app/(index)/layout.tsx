import { SearchLayout } from '@/widgets/search/ui/search-layout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SearchLayout>{children}</SearchLayout>
}
