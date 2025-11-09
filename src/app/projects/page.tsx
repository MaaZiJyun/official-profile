import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Projects</h1>

      <div className="mt-6">
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <Link href="https://momcare-landingpage.vercel.app/">
                <div className="text-3xl font-semibold hover:underline">Momcare</div>
              </Link>
              <div className="mt-1 text-sm text-zinc-500">
                Supervisor: Dr. Ng Keng Yap
              </div>
            </div>
            <div className="text-sm text-zinc-500">10/2021 – 04/2022</div>
          </div>

          <div className="mt-4 text-zinc-700">
            <div className="md:flex md:items-start md:gap-6">
              <div className="md:w-48 md:flex-shrink-0">
                <Image
                  src="/momcare.png"
                  alt="Momcare"
                  width={192}
                  height={108}
                  className="rounded-md object-cover"
                />
              </div>

              <div className="mt-4 md:mt-0 text-justify">
                <p className="mt-2">
                  Objective: To develop a smart assistant software aimed at
                  providing personalized health management and support for
                  pregnant women, thereby improving their health during
                  pregnancy. This project is a collaboration between the UPM
                  Department of Software Engineering and Columbia Asia Hospital
                  in Malaysia.
                </p>
                <p className="mt-2 italic">
                  The project began with collaborative research with doctors at
                  Columbia Asia Hospital to define the software requirements and
                  user needs; the interface was prototyped using Figma to ensure
                  a user-friendly experience. The mobile application was
                  implemented using Flutter and Dart, while back-end services
                  (data storage, processing and user management) were built with
                  Laravel and PHP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <Link href="https://play.google.com/store/apps/details?id=com.eos_credit.eos_credit&hl=en">
                <div className="text-3xl font-semibold hover:underline">EOS Credit</div>
              </Link>
              <div className="mt-1 text-sm text-zinc-500">
                Supervisor: Benjamin Lim
              </div>
            </div>
            <div className="text-sm text-zinc-500">03/2023 – 03/2024</div>
          </div>

          <div className="mt-4 text-zinc-700">
            <div className="md:flex md:items-start md:gap-6">
              <div className="md:w-48 md:flex-shrink-0">
                <Image
                  src="/eos.png"
                  alt="EOS Credit"
                  width={192}
                  height={108}
                  className="rounded-md object-cover"
                />
              </div>

              <div className="mt-4 md:mt-0 text-justify">
                <p className="mt-2">
                  Objective: To develop an innovative financial assistance app
                  that offers secure and flexible loan solutions for individuals
                  in need of quick monetary support. This project is a
                  collaboration between the UPM Department of Software
                  Engineering and EOS Systems Sdn. Bhd.
                </p>

                <p className="mt-2 italic">
                  The EOS Credit app was developed using the Flutter framework
                  to meet the specific requirements and design criteria provided
                  by EOS Systems Sdn. Bhd. The project was completed during an
                  internship and successfully released in the Malaysian region
                  on the Google Play Store. A demonstration commercial video was
                  also produced to promote the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
