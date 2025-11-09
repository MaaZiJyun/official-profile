import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Momcare',
      href: 'https://momcare-landingpage.vercel.app/',
      supervisor: 'Dr. Ng Keng Yap',
      date: '10/2021 – 04/2022',
      img: '/momcare.png',
      paragraphs: [
        `Objective: To develop a smart assistant software aimed at providing personalized health management and support for pregnant women, thereby improving their health during pregnancy. This project is a collaboration between the UPM Department of Software Engineering and Columbia Asia Hospital in Malaysia.`,
        `The project began with collaborative research with doctors at Columbia Asia Hospital to define the software requirements and user needs; the interface was prototyped using Figma to ensure a user-friendly experience. The mobile application was implemented using Flutter and Dart, while back-end services (data storage, processing and user management) were built with Laravel and PHP.`
      ]
    },
    {
      title: 'EOS Credit',
      href: 'https://play.google.com/store/apps/details?id=com.eos_credit.eos_credit&hl=en',
      supervisor: 'Benjamin Lim',
      date: '03/2023 – 03/2024',
      img: '/eos.png',
      paragraphs: [
        `Objective: To develop an innovative financial assistance app that offers secure and flexible loan solutions for individuals in need of quick monetary support. This project is a collaboration between the UPM Department of Software Engineering and EOS Systems Sdn. Bhd.`,
        `The EOS Credit app was developed using the Flutter framework to meet the specific requirements and design criteria provided by EOS Systems Sdn. Bhd. The project was completed during an internship and successfully released in the Malaysian region on the Google Play Store. A demonstration commercial video was also produced to promote the app.`
      ]
    }
  ];

  return (
    <div className="mt-4">
      {projects.map((p) => (
        <div key={p.title}>
          <div className="rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <Link href={p.href}>
                  <div className="text-xl font-semibold hover:underline">{p.title}</div>
                </Link>
                <div className="mt-1 text-sm text-zinc-500">Supervisor: {p.supervisor}</div>
              </div>
              <div className="text-sm text-zinc-500">{p.date}</div>
            </div>

            <div className="mt-4 text-zinc-700">
              <div className="md:flex md:items-start md:gap-6">
                <div className="md:w-48 md:flex-shrink-0">
                  <Image src={p.img} alt={p.title} width={192} height={108} className="rounded-md object-cover" />
                </div>

                <div className="mt-4 md:mt-0 text-justify">
                  {p.paragraphs.map((para, i) => (
                    <p className="mt-2" key={i}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
