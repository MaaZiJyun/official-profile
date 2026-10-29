import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Foot from "./components/Foot";
import LanguageProvider from "@/components/LanguageProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="select-none antialiased">
        <LanguageProvider>
          <header className="border-b">
            <Nav />
          </header>

          <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>

          <footer className="mx-auto max-w-4xl px-6 py-8 text-sm text-zinc-500">
            <Foot />
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
