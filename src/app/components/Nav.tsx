import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav>
      <div className="mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold">
            <Image src="/seal.png" alt="seal" width={40} height={40} />
          </Link>
          <div>
            <ul className="flex gap-4">
              <li>
                <Link className="hover:underline hover:text-red-600" href="/">
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline hover:text-red-600"
                  href="/posts"
                >
                  POST
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline hover:text-red-600"
                  href="/projects"
                >
                  PROJECT
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline hover:text-red-600"
                  href="/education"
                >
                  EDUCATION
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
