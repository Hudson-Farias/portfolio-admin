import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { API } from "@/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const hasAuth = await API.hasToken()

  return (
    <html lang="en" data-theme="black">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <div className="bg-base-100 h-screen">

          <div className="navbar shadow-sm">
            <div className="flex-1">
              <a href='/' className="btn btn-ghost text-xl text-info-content">HudsonDev</a>
            </div>

            {!hasAuth &&
              <div className="flex items-center">
                <a href={`${process.env.NEXT_PUBLIC_AUTH_URL}/discord/redirect`} target="_blank" className="btn btn-ghost text-xl">Login</a>
              </div>
            }
          </div>

          <div className="flex justify-center">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}
