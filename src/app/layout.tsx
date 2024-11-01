/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import Header from '@/components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aqtro",
  description: "By BlueMillStudio"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <SideNavbar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white">
              <div className="px-8 pt-8">
                <Header />
              </div>
            </div>

            {/* Page content */}
            <main className="flex-1 px-8 pb-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}