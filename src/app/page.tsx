import Image from "next/image";
import Link from "next/link";

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
          <h1 className="text-4xl font-bold">馬志遠</h1>
          <p className="mt-1 text-zinc-600">zy.maa@outlook.com</p>
        </div>
      </div>

      <div className="mt-8 text-justify">
        <h1 className="text-xl font-bold underline">INTRO.</h1>
        <p>
          Zijyun Maa is a Master’s student in Blockchain Technology at The Hong
          Kong Polytechnic University. He studied his B.S. in Software
          Engineering from University Putra Malaysia and he speaks English with
          IELTS band 7 and native Mandarin.
        </p>
        <a
          className="text-red-600 italic hover:underline"
          href="https://domuki.top"
        >
          More Interesting Things :)
        </a>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-bold underline">PORTFOLIO</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              img: "/momcare.png",
              title: "Momcare",
              desc: "Pregnancy health assistant application for pregnant women.",
            },
            {
              img: "/eos.png",
              title: "EOS Credit",
              desc: "Mobile loan application as a intern. project for EOS Systems Sdn. Bhd.",
            },
            {
              img: "/simu.png",
              title: "Constellation Simulator",
              desc: "A simulator for visualising EOM activities in a LEO constellation.",
            },
            {
              img: "/cradle.png",
              title: "Smart Cradle",
              desc: "Final-year IoT project on baby-monitoring hardware and application development.",
            },
            {
              img: "/certsys.png",
              title: "Diamond Certificate System",
              desc: "A blockchain webapp for scalable, transparent supplychain management.",
            },
          ].map((p) => (
            <Link
              href="/projects"
              key={p.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rounded-lg shadow-md p-3 text-center hover:scale-[1.05] hover:shadow-xl hover:cursor-pointer transition-transform group">
                <div className="h-32 w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={400}
                    height={200}
                    className="mx-auto h-full w-full object-cover rounded-md filter grayscale group-hover:grayscale-0 transition duration-300 ease-in-out"
                  />
                </div>
                <div className="mt-3 text-lg font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-zinc-600 italic">
                  {p.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
