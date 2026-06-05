const timelineItems = [
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
    period: "09/2025 - 12/2025",
    category: "Student",
    title:
      "Master Thesis on Resource-Aware Online Earth Observation Task Offloading",
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
    period: "03/2023 - 03/2024",
    category: "Mobile Developer",
    title: "EOS Credit Mobile App for Online Loan",
    org: "EOS Systems Sdn. Bhd.",
    supervisor: "Dr. Anita, Prof. Ng Keng Yap and Mr. Benjamin Lim",
    bullets: [
      "Developed by Flutter and finally released EOS Credit on Google Play Store.",
      "Created a demonstration commercial video to promote the app.",
    ],
  },
  {
    period: "10/2022 - 02/2023",
    category: "Student | Supervisor: Prof. Ng Keng Yap",
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
];

export default function TimelinePage() {
  return (
    <section className="space-y-10">
      <div className="p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Timeline
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            A Review Timeline of My Research, Academic, and Industry Experience.
          </h1>
          <p className="text-sm text-zinc-600 md:text-lg">
            The entries below follow the order shown in the reference image,
            with the newest experience first.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-2 h-full w-1 rounded-full bg-gradient-to-b from-red-600 via-red-300 to-white md:left-6" />

        <div className="space-y-6">
          {timelineItems.map((item) => (
            <article
              key={`${item.period}-${item.title}`}
              className="relative pl-12 md:pl-16"
            >
              <div className="relative mb-4 flex items-center">
                <span className="absolute -left-8 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-4 border-white bg-red-700 shadow-lg md:-left-13" />
                <div className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                  {item.period}
                </div>
              </div>
              <div className="rounded-lg bg-white/90 p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium uppercase text-zinc-500">
                      {item.category}
                    </div>
                    <h2 className="text-xl font-bold leading-tight text-zinc-900 md:text-2xl">
                      {item.title}
                    </h2>
                  </div>

                  <div className="text-left md:max-w-xs md:text-right">
                    <div className="text-sm font-semibold text-zinc-900">
                      {item.org}
                    </div>
                    <div className="mt-1 text-sm text-zinc-500">
                      {item.supervisor}
                    </div>
                  </div>
                </div>

                <ul className="mt-5 text-zinc-700">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 leading-7 items-center justify-start"
                    >
                      <span className="h-2 w-2 flex-none rounded-full bg-red-700" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
