import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lunar Quake",
  description: "A 3D Visualizer for moonquakes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`inter.className`}>
        <div className="w-full flex justify-center">
        <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
