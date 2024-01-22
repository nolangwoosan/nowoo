import { Poller_One, Nanum_Myeongjo, Inter } from "next/font/google";
import localFont from "next/font/local";

export const pollerOne = Poller_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poller-one",
});

export const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nanum-myeongjo",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

export const kapakana = localFont({
  src: "../../../public/fonts/Kapakana.woff",
  display: "swap",
  variable: "--font-kapakana",
});

export const jokerman = localFont({
  src: "../../../public/fonts/Jokerman.woff2",
  display: "swap",
  variable: "--font-jokerman",
});
