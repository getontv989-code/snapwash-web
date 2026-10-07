import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://snapwash.io"),
  applicationName: "Snapwash",
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
    <html lang="en-US" className={`${manrope.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Script src="/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
