"use client";

import Image from "next/image";
import Link from "next/link";
import CopyEmailButton from "../components/CopyEmailButton";
import { localizeProject, projects } from "@/lib/projects";
import { useLanguage } from "@/components/LanguageProvider";

function getProjectEndDate(date: string) {
  const [month, year] = date.split("–").at(-1)!.trim().split("/");
  return Number(year) * 12 + Number(month);
}

export default function Home() {
  const { language, t } = useLanguage();
  const localizedProjects = [...projects]
    .sort((a, b) => getProjectEndDate(b.date) - getProjectEndDate(a.date))
    .map((project) => localizeProject(project, language));

  return (
    <section>
      <div className="flex items-center gap-4">
        <Image
          src="/profile.jpg"
          alt={language === "en" ? "Profile" : "個人照片"}
          width={120}
          height={120}
          className="shrink-0 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">Zi Jyun, Maa</h1>
          <h1 className="text-3xl font-bold tracking-wider">馬致遠</h1>
          <CopyEmailButton
            email="maazijyun@gmail.com"
            display={"maazijyun[at]gmail[dot]com"}
          />
        </div>
      </div>

      <div className="mt-8 text-justify">
        <h1 className="text-xl font-bold underline">{t("about")}</h1>
        <div className="mt-2 space-y-2">
          {language === "en" ? (
            <>
              <p>
                I am an ENTJ personality type. My hobbies include reading,
                hiking, composing music, and playing violin. My native language
                is Chinese Mandarin, and I am fluent in English with an IELTS
                score of 7. I received my Master’s degree in{" "}
                <span className="font-semibold">Blockchain Technology</span>, at{" "}
                <a
                  href="https://www.polyu.edu.hk/"
                  className="text-red-600 hover:underline hover:cursor-pointer"
                >
                  The Hong Kong Polytechnic University (PolyU)
                </a>{" "}
                in March 2026, and my Bachelor’s degree in{" "}
                <span className="font-semibold">Software Engineering</span>, from{" "}
                <a
                  href="https://www.upm.edu.my/"
                  className="text-red-600 hover:underline hover:cursor-pointer"
                >
                  Universiti Putra Malaysia (UPM)
                </a>{" "}
                in September 2024.
              </p>
              <p>
                I have worked on projects (academic & business) across multiple
                domains, including{" "}
                <span className="font-semibold">Mobile & Web App Development</span>,{" "}
                <span className="font-semibold">Blockchain Development</span>, and{" "}
                <span className="font-semibold">Raspberry PI</span>,{" "}
                <span className="font-semibold">Jetson Orin NX</span> and{" "}
                <span className="font-semibold">Arduino</span> Development. My
                research interests include{" "}
                <span className="font-semibold">Software Engineering</span>,
                <span className="font-semibold"> Reinforcement Learning</span>,
                <span className="font-semibold"> Edge Computing</span>, and
                <span className="font-semibold"> Cyborg Animal</span>. I am
                particularly interested in applying these technologies to
                real-world problems.
              </p>
              <p className="italic">
                If you want to know more about me, please feel free to contact
                me via email or LinkedIn. I am always open to discussing
                potential collaborations, job opportunities, or just having a
                chat about technology and research.
              </p>
            </>
          ) : (
            <>
              <p>
                我的 MBTI 人格類型是 ENTJ。我的興趣包括閱讀、健行、作曲與拉小提琴。
                我的母語是華語，英語流利，IELTS 成績為 7 分。我於 2026 年 3 月取得
                <a
                  href="https://www.polyu.edu.hk/"
                  className="text-red-600 hover:underline hover:cursor-pointer"
                >
                  香港理工大學（PolyU）
                </a>
                的<span className="font-semibold">區塊鏈科技</span>碩士學位，並於
                2024 年 9 月取得
                <a
                  href="https://www.upm.edu.my/"
                  className="text-red-600 hover:underline hover:cursor-pointer"
                >
                  馬來西亞博特拉大學（UPM）
                </a>
                的<span className="font-semibold">軟體工程</span>學士學位。
              </p>
              <p>
                我曾參與多個不同領域的學術與商業專案，包括
                <span className="font-semibold">行動與網頁應用程式開發</span>、
                <span className="font-semibold">區塊鏈開發</span>，以及
                <span className="font-semibold">Raspberry Pi</span>、
                <span className="font-semibold">Jetson Orin NX</span> 與
                <span className="font-semibold">Arduino</span> 開發。我的研究興趣包括
                <span className="font-semibold">軟體工程</span>、
                <span className="font-semibold">強化學習</span>、
                <span className="font-semibold">邊緣運算</span>與
                <span className="font-semibold">仿生動物</span>，並特別關注如何將這些技術應用於現實問題。
              </p>
              <p className="italic">
                如果您想進一步了解我，歡迎透過電子郵件或 LinkedIn 與我聯絡。我很樂意討論合作機會、工作機會，或交流科技與研究相關話題。
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-bold underline">{t("articles")}</h1>
        <article className="mt-4">
          <h2 className="text-lg font-semibold">
            <span className="mr-2 inline-block whitespace-nowrap rounded-full bg-green-100 px-2.5 py-1 align-middle text-xs font-semibold text-green-700">
              {t("accepted")}
            </span>
            {language === "en"
              ? "[MASS 2026] Latency-Energy Co-Optimized Task Scheduling for Earth Observation in Orbital Edge Computing"
              : "[MASS 2026] 軌道邊緣運算中面向地球觀測的延遲—能源協同最佳化任務排程"}
          </h2>
          <dl className="mt-3 space-y-1 text-sm">
            <div>
              <dd className="inline">
                <strong>Zhiyuan Ma</strong>∗, Xiangzhi Zhang∗, Yu Liu∗, Zhenhua
                Liu, Yuanyuan Yang
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-bold underline">{t("projects")}</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {localizedProjects.map((p) => (
            <Link href={`/projects/${p.slug}`} key={p.title}>
              <div className="rounded-lg shadow-md p-3 text-center hover:scale-[1.05] hover:shadow-xl hover:cursor-pointer transition-transform group">
                <div className="h-32 w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={400}
                    height={200}
                    className="mx-auto h-full w-full object-cover rounded-md filter grayscale-50 group-hover:grayscale-0 transition duration-300 ease-in-out"
                  />
                </div>
                <div className="mt-3 text-lg font-semibold">{p.title}</div>
                <div className="text-xs text-zinc-400">{p.date}</div>
                <div className="mt-1 text-sm text-zinc-600">{p.intro}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
