"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Foot() {
  const { language, t } = useLanguage();

  return (
    <div>
      © {new Date().getFullYear()} {language === "en" ? "Maa ZiJyun’s" : "馬致遠的"} {t("profile")}.
    </div>
  );
}
