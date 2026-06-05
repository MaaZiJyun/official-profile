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
          <h1 className="text-3xl font-bold tracking-wider">馬致遠</h1>
          <CopyEmailButton
            email="maazijyun@gmail.com"
            display={"maazijyun[at]gmail[dot]com"}
          />
        </div>
      </div>

      <div className="mt-8 text-justify">
        <h1 className="text-xl font-bold underline">ABOUT</h1>
        <div className="mt-2 space-y-2">
          <p>
            I am an ENTJ/INTJ personality type. My hobbies include reading,
            hiking, composing music, and playing violin. My native language is
            Chinese Mandarin, and I am fluent in English with an IELTS score of
            7. I received my Master’s degree in{" "}
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
            I have worked on projects (research & business) across multiple
            domains, including{" "}
            <span className="font-semibold">Mobile & Web App Development</span>,{" "}
            <span className="font-semibold">Resource Joint Optimization</span>,{" "}
            <span className="font-semibold">Blockchain Development</span>, and{" "}
            <span className="font-semibold">
              Raspberry PI & Jetson Orin NX Programming
            </span>
            . My research interests include{" "}
            <span className="font-semibold">Software Engineering</span>,
            <span className="font-semibold"> Reinforcement Learning</span>,
            <span className="font-semibold"> IoT</span>, and
            <span className="font-semibold"> Edge Computing</span>. I am
            particularly interested in applying these technologies to real-world
            problems in science, education, and healthcare.
          </p>
          <p className="italic">
            If you want to know more about me, please feel free to contact me
            via email or LinkedIn. I am always open to discussing potential
            collaborations, job opportunities, or just having a chat about
            technology and research.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-bold underline">PROJECTS</h1>
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
