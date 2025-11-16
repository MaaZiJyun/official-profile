import Image from "next/image";
import Link from "next/link";
import CopyEmailButton from "../components/CopyEmailButton";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <section>
      <div className="flex items-center gap-4">
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">Zi Jyun, Maa</h1>
          <h1 className="text-3xl font-bold tracking-wider">馬志遠</h1>
          <CopyEmailButton
            email="maazijyun@gmail.com"
            display={"maazijyun[at]gmail[dot]com"}
          />
        </div>
      </div>

      <div className="mt-8 text-justify">
        <h1 className="text-xl font-bold underline">INTRODUCTION</h1>
        <div className="mt-2 space-y-2">
          <p>
            ZiJyun Maa is a Master’s student in Blockchain Technology at{" "}
            <a
              href="https://www.polyu.edu.hk/"
              className="text-red-800 hover:underline"
            >
              The Hong Kong Polytechnic University
            </a>
            . He received his Bachelor of Science in Software Engineering from{" "}
            <a
              href="https://www.upm.edu.my/"
              className="text-red-800 hover:underline"
            >
              Universiti Putra Malaysia
            </a>{" "}
            in 2024. His native language is Mandarin, and he is fluent in
            English with an IELTS score of 7.
          </p>
          <p>
            He has worked on projects across multiple domains, including
            <span className="font-semibold"> Software Engineering</span>,{" "}
            <span className="font-semibold">Networks</span>,{" "}
            <span className="font-semibold">Reinforcement Learning</span>,{" "}
            <span className="font-semibold">Blockchain Systems</span>, and {" "}
            <span className="font-semibold">Internet of Things (IoT)</span>. His
            academic and research interests include <span className="font-semibold">Software Engineering</span>,
            <span className="font-semibold"> Networked Systems</span>,
            <span className="font-semibold"> Machine Learning</span>,
            <span className="font-semibold"> Reinforcement Learning</span>,
            <span className="font-semibold"> IoT</span>,
            <span className="font-semibold"> Mobile and Edge Computing</span>,
            and <span className="font-semibold">Embedded Systems</span>. He is particularly
            interested in applying these technologies to real-world problems in
            science, education, and healthcare.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-bold underline">PORTFOLIO</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((p) => (
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
