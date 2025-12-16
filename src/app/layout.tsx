import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { DeviceProvider } from "@/shared/contexts/DeviceContext";
import { BottomNav } from "@/shared/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Smart Home Assistant",
  description: "Modern, minimalist smart home control system",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <DeviceProvider>
            <main>{children}</main>
            <BottomNav />
          </DeviceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
