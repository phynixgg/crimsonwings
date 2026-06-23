import { Orbitron, Rajdhani, Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoTC = Noto_Sans_TC({
  // CJK fonts are large; next/font requires preload disabled when no Latin
  // subset is declared. The font still loads on demand.
  weight: ["400", "500", "700", "900"],
  preload: false,
  variable: "--font-noto-tc",
  display: "swap",
});

export const metadata = {
  title: `${site.brand.zh} 官方周邊 | ${site.brand.legion}`,
  description:
    "赤羽軍團官方周邊 — Akahane Legion / Crimson Wings premium esports merch. 為戰場而生，為兄弟而穿。",
  openGraph: {
    title: `${site.brand.zh} 官方周邊`,
    description: "Akahane Legion Official Merch — premium black & gold esports apparel.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} ${notoTC.variable} min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
