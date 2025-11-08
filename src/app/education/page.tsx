import Image from "next/image";

export default function BiographyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Education</h1>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="mt-4 space-y-4 text-zinc-700 md:w-2/3 text-justify">
          <p>
            Zhiyuan Ma is a Master’s student in the Department of Computing at
            The Hong Kong Polytechnic University, specializing in Blockchain
            Technology. His coursework includes decentralized applications,
            applied cryptography, distributed ledger technology, distributed
            algorithms, and machine learning.
          </p>

          <p>
            He completed his Bachelor of Software Engineering at University
            Putra Malaysia with a GPA of 3.53/4.0 and Second Class Upper Honors.
            His undergraduate curriculum covered Java programming, statistics,
            discrete mathematics, web and mobile application development,
            software architecture, and electronic commerce.
          </p>

          <p>
            He has a solid foundation in software engineering and computer
            science and continues to develop expertise in blockchain systems and
            distributed technologies.
          </p>
        </div>
        <div className="mt-4 space-y-4 text-zinc-700 md:w-1/3 text-justify">
          {/* widget list */}
          <div className="flex flex-col gap-3">
            {[
              {
                logo: "/polyu.png",
                name: "The Hong Kong Polytechnic University",
                qs: "QS 54",
                degree: "MSc in Blockchain Technology",
              },
              {
                logo: "/upm.png",
                name: "University Putra Malaysia",
                qs: "QS 134",
                degree: "BEng in Software Engineering",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-lg border p-3 bg-white shadow-sm"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </div>
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm text-zinc-500">{item.qs}</div>
                  <div className="text-sm text-zinc-800">{item.degree}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
