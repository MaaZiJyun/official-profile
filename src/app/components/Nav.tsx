"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function Nav() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav>
      <div className="mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold">
            <Image src="/seal.png" alt="seal" width={40} height={40} />
          </Link>
          <div className="flex items-center gap-4">
            <ul className="flex gap-4">
              <li>
                <Link className="hover:underline hover:text-red-600" href="/">
                  {t("intro")}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline hover:text-red-600"
                  href="/moments"
                >
                  {t("moments")}
                </Link>
              </li>
            </ul>
            <div
              className="flex rounded-full p-0.5 text-sm"
              aria-label="Language / 語言"
            >
              <button
                type="button"
                aria-pressed={language === "en"}
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 py-1 transition-colors hover:cursor-pointer ${
                  language === "en"
                    ? "bg-red-700 text-white"
                    : "text-zinc-500 hover:text-red-700"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                aria-pressed={language === "zh-Hant"}
                onClick={() => setLanguage("zh-Hant")}
                className={`rounded-full px-2.5 py-1 transition-colors hover:cursor-pointer ${
                  language === "zh-Hant"
                    ? "bg-red-700 text-white"
                    : "text-zinc-500 hover:text-red-700"
                }`}
              >
                繁
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
