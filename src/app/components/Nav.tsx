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
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/posts">Post</Link>
              </li>
              <li>
                <Link href="/projects">Project</Link>
              </li>
              <li>
                <Link href="/education">Education</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
