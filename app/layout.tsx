import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
