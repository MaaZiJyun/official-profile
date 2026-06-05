import Image from "next/image";

export default function BiographyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Education</h1>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="mt-4 space-y-4 text-zinc-700 md:w-2/3 text-justify">
          <p>
            Zijyun Maa (Zhiyuan Ma) is currently pursuing an MSc in Blockchain Technology at
            The Hong Kong Polytechnic University. His academic interests include
            Software Engineering, Artificial Intelligence, Reinforcement
            Learning, and Simulation for real-world problem solving. He obtained
            his Bachelor’s degree in Software Engineering from Universiti Putra
            Malaysia with Second Class Upper Honours. He also holds an IELTS
            Overall score of 7.0 (Listening 7.0, Speaking 7.0, Reading 6.5,
            Writing 7.0), indicating solid English proficiency.
          </p>

          <p>
            He has a solid foundation in software engineering and computer
            science and continues to develop expertise in simulation systems and
            distributed technologies. He is an effective communicator and
            collaborative learner with strong problem-solving skills. His
            international study experience and diverse project background have
            helped shape his adaptability and preparedness for long-term
            research and development.
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
                className="flex items-center gap-3 rounded-lg shadow-md p-3 hover:scale-[1.05] hover:shadow-xl hover:cursor-pointer transition-transform group"
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
