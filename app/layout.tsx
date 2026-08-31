import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { FridgeProvider } from "@/context/fridge-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "冰箱裡有什麼",
  description: "打開冰箱，勾選手邊的食材，立刻找到能做的料理與完整食譜。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSansTC.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <body className="app-texture grain relative flex min-h-full flex-col">
        <FridgeProvider>
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </div>
        </FridgeProvider>
      </body>
    </html>
  );
}
