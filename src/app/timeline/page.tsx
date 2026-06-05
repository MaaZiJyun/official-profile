const timelineItems = [
  {
    period: "05/2026",
    category: "",
    title:
      "Submitted the paper on Latency-Energy Co-Optimized Task Scheduling for Earth Observation in Orbital Edge Computing to MASS 2026",
    org: "",
    supervisor: "",
    bullets: [],
  },
  {
    period: "03/2026 - 07/2026",
    category: "Research Assistant",
    title:
      "Latency-Energy Co-Optimized Task Scheduling for Earth Observation in Orbital Edge Computing",
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

export default function TimelinePage() {
  return (
    <section className="space-y-10">
      <div className="p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Timeline
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            A Review Timeline of My Research, Academic, and Industry Experience.
          </h1>
          <p className="text-sm text-zinc-600 md:text-lg">
            The entries below follow the order shown in the reference image,
            with the newest experience first.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-2 h-full w-1 rounded-full bg-gradient-to-b from-red-600/100 via-red-600/50 red-600/10 md:left-6" />

        <div className="space-y-6">
          {timelineItems.map((item) => (
            <article
              key={`${item.period}-${item.title}`}
              className="relative pl-12 md:pl-16"
            >
              <div className="relative mb-4 flex items-center">
                <span className="absolute -left-8 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-4 border-white bg-red-700 shadow-lg md:-left-13" />
                <div className="inline-flex w-fit rounded-full bg-red-700/20 px-3 py-1 text-sm font-semibold text-red-700">
                  {item.period}
                </div>
              </div>
              <div
                className={` ${item.category === "" ? "p-3" : "shadow-lg p-6"} rounded-lg transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="space-y-2">
                    {item.category !== "" && (
                      <div className="text-sm font-medium uppercase text-zinc-500">
                        {item.category}
                      </div>
                    )}
                    <h2
                      className={`${item.category === "" ? "italic" : "font-bold text-xl"} leading-tight `}
                    >
                      {item.title}
                    </h2>
                  </div>

                  <div className="text-left md:max-w-xs md:text-right">
                    <div className="text-sm font-semibold ">
                      {item.org}
                    </div>
                    <div className="mt-1 text-sm text-zinc-500">
                      {item.supervisor}
                    </div>
                  </div>
                </div>
                {item.image && (
                  <div className="mt-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-xs w-full rounded-md shadow-md object-contain"
                    />
                  </div>
                )}

                {item.bullets.length > 0 && (
                  <ul className="mt-5 text-zinc-700">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm items-center justify-start"
                      >
                        <span className="h-1 w-1 flex-none rounded-full bg-black" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
