import "./_styles/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Fragment } from "react";
import { Toaster } from "src/shared/ui/toaster";

import CoreProvider from "@/app/_providers/core-provider";
import GoogleAnalytics from "@/app/_providers/google-analytics";
import { cn } from "@/shared/api-helpers";
import { openGraphImage } from "@/shared/ui/open-graph";
import { Footer } from "@/widgets/footer";

const pretendard = localFont({ src: "../../public/font/PretendardVariable.woff2" });

export const metadata: Metadata = {
  title: "NOWOO - 메이플랜드 아이템 검색 사이트",
  description: "메이플랜드 아이템 검색 사이트",
  applicationName: "NOWOO",
  keywords: "메이플스토리, 메이플랜드, 아이템, 몬스터",
  creator: "NOWOO",
  metadataBase: new URL("https://nowoo.kr"),
  alternates: {
    canonical: "https://nowoo.kr",
  },
  icons: [
    {
      rel: "icon",
      url: "https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b28ucG5nIiwiaWF0IjoxNzA2MDYxODE1LCJleHAiOjE4NjM3NDE4MTV9.jjylwylu28UmnAnVbdiPpYoXuYw3H5fta1C4d_ER2N0&t=2024-01-24T02%3A03%3A35.771Z",
    },
  ],
  openGraph: {
    siteName: "NOWOO",
    type: "website",
    title: "NOWOO - 메이플랜드 아이템 검색 사이트",
    description: "메이플랜드 아이템 검색 사이트",
    url: "https://nowoo.kr",
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOWOO - 메이플랜드 아이템 검색 사이트",
    description: "메이플랜드 아이템 검색 사이트",
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  verification: {
    google: "Kqvp08KOCUZgU4pyr6CUFymLP3Fw6EyNaQjmSrAa5fg",
    other: {
      "naver-site-verification": "b779ab4179ff0174da67f6f4178e29bda49a5a7f",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn(pretendard.className, "text-[#222222] max-md:text-sm")}>
        <CoreProvider>
          <div className="min-h-[calc(100dvh-200px)] bg-gray-100">{children}</div>
          {process.env.NEXT_PUBLIC_TEST_ENV}
          <Footer />
          <Toaster />
          {/* <button
            className='g-recaptcha invisible'
            data-sitekey='6Lf80GIpAAAAANfO7xqEa9kgIVF2KEaqP_TpFOR3'
            data-callback='onSubmit'
            data-action='submit'
          ></button> */}
        </CoreProvider>
      </body>
      {process.env.NODE_ENV === "production" && (
        <Fragment>
          <GoogleAnalytics />
          <Script src="https://d-collect.jennifersoft.com/7e49137d/demian.js" strategy="afterInteractive" />
          <Script id="jennifer-frontend" strategy="afterInteractive">
            {`
            (function(j,ennifer) {
              j['dmndata']=[];j['jenniferFront']=function(args){window.dmndata.push(args)};
              j['dmnaid']=ennifer;j['dmnatime']=new Date();j['dmnanocookie']=false;j['dmnajennifer']='JENNIFER_FRONT@INTG';
            }(window, '7e49137d'));
          `}
          </Script>
        </Fragment>
      )}
      {/* <Script src='https://www.google.com/recaptcha/api.js' strategy='afterInteractive' /> */}
    </html>
  );
}
