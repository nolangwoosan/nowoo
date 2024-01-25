import Footer from '@/components/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='h-full'>
      {children}
      <Footer />
    </main>
  )
}
