import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "loyalmanuka | Photography Portfolio",
  description: "Photography portfolio showcasing street photography, timeline posts, and diverse photography work by loyalmanuka. Available for photography internships and photo editing projects.",
  keywords: ["photography", "portfolio", "street photography", "photo editing", "Mumbai photographer", "loyalmanuka"],
  authors: [{ name: "loyalmanuka" }],
  openGraph: {
    title: "loyalmanuka | Photography Portfolio",
    description: "Photography portfolio showcasing street photography and diverse work",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6LJMRVDWTW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6LJMRVDWTW');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
