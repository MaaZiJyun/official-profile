import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import Nav from "./components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Profile",
  description: "Personal homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`select-none ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b bg-white/50 dark:bg-black/50">
          <Nav />
        </header>

        <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>

        <footer className="mx-auto max-w-4xl px-6 py-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} Maa ZiJyun's Profile.
        </footer>
      </body>
    </html>
  );
}
