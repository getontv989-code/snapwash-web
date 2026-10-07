import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans", display: "swap" });

// Runs before first paint so a saved dark preference never flashes light
const THEME_INIT = `try{if(localStorage.getItem("snapwash-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

// Busts browser caches of /main.js on every deploy so phones never run a stale copy
const SCRIPT_VERSION = (process.env.VERCEL_GIT_COMMIT_SHA || "dev").slice(0, 8);

export const metadata: Metadata = {
  metadataBase: new URL("https://snapwash.io"),
  applicationName: "Snapwash",
  formatDetection: { telephone: false, date: false, address: false, email: false },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", siteName: "Snapwash", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0060F6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" data-theme="light" className={`${manrope.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        {children}
        <Script src={`/main.js?v=${SCRIPT_VERSION}`} strategy="afterInteractive" />
      </body>
    </html>
  );
}
