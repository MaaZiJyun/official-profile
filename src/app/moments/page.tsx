import Image from "next/image";

const moments = [
  {
    period: "08/2026 — 11/2026",
    category: "Research Assistant",
    title:
      "Joined a project at the Green and Intelligent Manufacturing Research Center, providing research support and technical development for biological robotics, insect robotics, and intelligent control systems.",
    org: "Green and Intelligent Manufacturing Research Center",
    supervisor: "Prof. Ma Yuan",
    bullets: [],
  },
  {
    highlight: true,
    period: "08/2026",
    category: "",
    title:
      "My paper 'Latency-Energy Co-Optimized Task Scheduling for Earth Observation in Orbital Edge Computing' has been accepted at the 2026 IEEE 23rd International Conference on Mobile Ad Hoc and Smart Systems (MASS). The acceptance rate was 29.7%.",
    org: "IEEE MASS 2026",
    supervisor: "Great thanks to Prof. Liu Yu & Mr. Zhang XiangZhi",
    bullets: [],
  },
  {
    period: "05/2026",
    category: "",
    title:
      "Submitted the paper 'Latency-Energy Co-Optimized Task Scheduling for Earth Observation in Orbital Edge Computing' to MASS 2026",
    org: "",
    supervisor: "",
    bullets: [],
  },
  {
    period: "03/2026 - 07/2026",
    category: "Research Assistant",
    title:
      "Participated in the research on Latency-Energy Co-Optimized Task Scheduling for Earth Observation in Orbital Edge Computing",
    org: "HKPU, Dept. of Computing",
    supervisor: "Prof. Liu Yu",
    bullets: [
      "Proposed a realistic system model and formulated a Dec-POMDP problem.",
      "Leveraged MAPPO to achieve performance optimization.",
      "Implemented a simulation program for experiments and validated system performance by baseline comparison.",
      "Wrote the paper for publication.",
    ],
  },

  {
    period: "03/2026",
    category: "",
    title:
      "Graduated in The Hong Kong Polytechnic University (PolyU) for Master’s Degree in Blockchain Technology",
    org: "",
    image: "/photos/mas_grad.jpg",
    supervisor: "",
    bullets: [],
  },
  {
    period: "09/2025 - 12/2025",
    category: "Student",
    title:
      "Master Thesis: Resource-Aware Online Earth Observation Task Offloading",
    org: "HKPU, Dept. of Computing",
    supervisor: "Prof. Liu Yu",
    bullets: [
      "Proposed a realistic system model and formulated an MDP problem.",
      "Utilised PPO in Gym to achieve online joint task offloading and resource allocation.",
      "Implemented a simulator for experiments, demonstrations, and validated algorithm performance.",
      "Wrote the final year academic dissertation for graduation.",
    ],
  },
  {
    period: "09/2024",
    category: "",
    title:
      "Registered in The Hong Kong Polytechnic University (PolyU) for Master’s Degree in Blockchain Technology",
    org: "",
    supervisor: "",
    bullets: [],
  },
  {
    period: "06/2024 - 03/2024",
    category: "Teaching Assistant",
    title:
      "IELTS Teaching Assistant",
    org: "Beijing Qingfen Education Technology Co., Ltd.",
    supervisor: "Mr. Shuqiang Peng",
    bullets: [
      "Assisted in teaching IELTS preparation courses to students, including providing guidance on writing, speaking, listening, and reading skills.",
      "Organized practice sessions and provided feedback to students to help them improve their performance in the IELTS examination.",
    ],
  },
  {
    highlight: true,
    period: "01/2024",
    category: "Certification",
    title:
      "IELTS Academic with Overall Band Score of 7",
    org: "",
    image: "/certs/ielts_3.png",
    supervisor: "",
    bullets: [],
  },
  {
    period: "03/2023 - 03/2024",
    category: "Mobile Developer",
    title: "EOS Credit Mobile App for Online Loan",
    org: "EOS Systems Sdn. Bhd.",
    image: "/photos/eos_intern.jpg",
    supervisor: "Dr. Anita, Prof. Ng Keng Yap and Mr. Benjamin Lim",
    bullets: [
      "Developed by Flutter and finally released EOS Credit on Google Play Store.",
      "Created a demonstration commercial video to promote the app.",
    ],
  },
  {
    period: "09/2023",
    category: "",
    title:
      "Graduated in Universiti Putra Malaysia (UPM) for Bachelor’s Degree in Software Engineering",
    org: "",
    image: "/photos/bach_grad.jpg",
    supervisor: "",
    bullets: [],
  },
  {
    period: "12/2022",
    category: "Certification",
    title:
      "IELTS Academic with Overall Band Score of 6.5",
    org: "",
    image: "/certs/ielts_2.png",
    supervisor: "",
    bullets: [],
  },
  {
    period: "10/2022 - 02/2023",
    category: "Student",
    title: "Bachelor FYP: Smart Cradle System for Infants",
    org: "UPM, Dept. of Software Engineering",
    supervisor: "Prof. Ng Keng Yap",
    bullets: [
      "Designed UIs for both client and admin and developed them by using Flutter and React.",
      "Built a python-driven program on Raspberry Pi featuring Wi-Fi/Bluetooth connectivity and hardware control.",
      "Integrated automated health tracking and remote management features.",
      "Wrote documents, including thesis, SRS, and SDD for this project.",
    ],
  },
  {
    period: "10/2021 - 04/2022",
    category: "Research Assistant",
    title: "Academic Project: Momcare Smart Assistant Software for Pregnant",
    org: "UPM, Dept. of Software Engineering",
    supervisor: "Prof. Ng Keng Yap",
    bullets: [
      "Studied requirements with doctors in Columbia Asia Hospital and designed UIs by utilising Figma.",
      "Developed the mobile app with Flutter and Dart, and used Laravel and PHP for back-end services.",
      "Generated databases, URIs, and database operations for data storage, processing, and user management.",
      "Developed core modules by Flutter for health data recording, reminders, and personalized suggestions.",
    ],
  },
  {
    period: "10/2021 - 11/2021",
    category: "Competition",
    title: "Third Place in Huawei ICT Competition Malaysia 2021-2022",
    org: "UPM and Huawei Malaysia",
    supervisor: "",
    image: "/certs/huawei_3rd.jpg",
    bullets: [
      "Participated in the Huawei ICT competition 2021-2022, a nationwide competition organized by Huawei and UPM",
      "Won the third place",
    ],
  },
  {
    period: "10/2021",
    category: "Presentation",
    title: "International Learning Online Sharing Experiences",
    org: "FSKTM, Universiti Putra Malaysia",
    image: "/certs/mpp_cert.png",
    supervisor: "",
    bullets: [
      "For contribution as a speaker titled: \"International Learning Online Sharing Experiences\" at Minggu Perkasa Putra (MPP) -Faculty Level On Minggu Putra Perkasa"
    ],
  },
  {
    period: "08/2021 - 09/2021",
    category: "Certification",
    title: "Certificate of Huawei Certified ICT Associate (HCIA)",
    org: "UPM and Huawei Malaysia",
    image: "/certs/huawei_cert.jpg",
    supervisor: "",
    bullets: [
      "Paticipated in the Huawei HCIA examination preparation course provided by UPM",
      "Passed the Huawei HCIA certification examination and obtained the certificate",
    ],
  },
  {
    period: "09/2019",
    category: "",
    title:
      "Registered in Universiti Putra Malaysia (UPM) for Bachelor’s Degree in Software Engineering",
    org: "",
    supervisor: "",
    bullets: [],
  },
];

type Moment = (typeof moments)[number];

function MomentCard({ item }: { item: Moment }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/70 ${item.highlight ? "border-red-700 bg-red-700 text-white ring-1 ring-red-200" : "border-zinc-200/80 bg-white"}`}
    >
      {item.image && (
        <div className="overflow-hidden bg-zinc-100">
          <Image
            src={item.image}
            alt={item.title}
            width={600}
            height={420}
            className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${item.highlight ? "bg-white/15 text-white" : "bg-red-50 text-red-700"}`}>
            {item.period}
          </span>
          {item.category && (
            <span className={`text-right text-[10px] font-bold uppercase tracking-[0.16em] ${item.highlight ? "text-red-100" : "text-zinc-400"}`}>
              {item.category}
            </span>
          )}
        </div>
        <h2 className={`text-lg font-bold leading-snug ${item.highlight ? "text-white" : "text-zinc-900"}`}>
          {item.title}
        </h2>
        {(item.org || item.supervisor) && (
          <div className={`border-t pt-3 text-sm ${item.highlight ? "border-white/20 text-red-100" : "border-zinc-100 text-zinc-500"}`}>
            {item.org && <div className={`font-semibold ${item.highlight ? "text-white" : "text-zinc-700"}`}>{item.org}</div>}
            {item.supervisor && <div className="mt-1">{item.supervisor}</div>}
          </div>
        )}
        {item.bullets.length > 0 && (
          <ul className={`space-y-2 border-t pt-3 text-sm leading-6 ${item.highlight ? "border-white/20 text-red-50" : "border-zinc-100 text-zinc-600"}`}>
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${item.highlight ? "bg-white" : "bg-red-500"}`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function MomentsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-5 sm:hidden">
        {moments.map((item) => (
          <MomentCard key={`${item.period}-${item.title}`} item={item} />
        ))}
      </div>
      <div className="hidden items-start gap-5 sm:grid sm:grid-cols-2">
        {[0, 1].map((column) => (
          <div key={column} className="space-y-5">
            {moments
              .filter((_, index) => index % 2 === column)
              .map((item) => (
                <MomentCard key={`${item.period}-${item.title}`} item={item} />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}
