import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Navbar";
import Navigation from "@/components/Navigation";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chaos Coin - DeFi Trading Platform",
  description: "Trade CHAOS tokens on Avalanche network with advanced DeFi features",
  keywords: ["CHAOS", "DeFi", "Avalanche", "Trading", "Cryptocurrency"],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ThirdwebProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <main className="pt-16 pb-20 md:pb-8">
              {children}
            </main>
            <Navigation />
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
