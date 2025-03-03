import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="black">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <div className="bg-base-100 h-screen">

          <div className="navbar shadow-sm">
            <div className="flex-1">
              <a href='/' className="btn btn-ghost text-xl">HudsonDev</a>
            </div>
            
            {/* <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li><a>Link</a></li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li><a>Link 1</a></li>
                      <li><a>Link 2</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div> */}
          </div>



          <div className="flex justify-center">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}
