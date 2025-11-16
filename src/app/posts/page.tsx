import fs from "fs";
import path from "path";

type Post = {
  file: string;
  title: string;
  date: string;
  excerpt: string;
};

async function loadTexPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), "public", "posts");
  let files: string[] = [];
  try {
    files = await fs.promises.readdir(postsDir);
  } catch (e) {
    return [];
  }

  const texFiles = files.filter((f) => f.endsWith(".tex"));

  const posts: Post[] = await Promise.all(
    texFiles.map(async (file) => {
      const full = path.join(postsDir, file);
      const raw = await fs.promises.readFile(full, "utf8");

      // try to extract \title{...} or fallback to filename
      const titleMatch = raw.match(/\\title\{([^}]+)\}/);
      const dateMatch = raw.match(/\\date\{([^}]+)\}/);
      const title = titleMatch
        ? titleMatch[1].trim()
        : file.replace(/\.tex$/, "");
      const date = dateMatch ? dateMatch[1].trim() : "";

      // simple excerpt: extract content inside \begin{document}...\end{document}
      // and take the first non-empty paragraph from the document body (not title/author/date)
      let body = raw;
      const docMatch = raw.match(
        /\\begin\{document\}([\s\S]*?)\\end\{document\}/
      );
      if (docMatch) body = docMatch[1];
      // Prefer the first sentence inside \section{Introduction} if present.
      // Fallback: extract content inside \begin{document}...\end{document}
      // and take the first non-empty paragraph from the document body.
      let paragraphMatch = "";
      const introMatch = raw.match(
        /\\section\{Introduction\}([\s\S]*?)(?:\\section\{|\\end\{document\}|$)/i
      );
      if (introMatch) {
        // take the first 50 characters from the introduction section (cleaned)
        const introBody = introMatch[1].trim();
        const cleanedIntro = introBody
          .replace(/%.*$/gm, "")
          .replace(/\\[a-zA-Z@]+(?:\{[^}]*\})?/g, "")
          .replace(/[{}]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        paragraphMatch = cleanedIntro.slice(0, 200).trim();
      } else {
        let body = raw;
        const docMatch = raw.match(
          /\\begin\{document\}([\s\S]*?)\\end\{document\}/
        );
        if (docMatch) body = docMatch[1];
        paragraphMatch =
          body.split(/\r?\n\r?\n/).find((p) => p.trim().length > 0) ?? "";
      }

      function stripTex(text: string) {
        if (!text) return "";
        // remove comments
        let s = text.replace(/%.*$/gm, "");
        // remove environments \begin{...}...\end{...}
        s = s.replace(/\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\}/g, " ");
        // remove display and inline math ($...$, $$...$$, \[...\], \(...\))
        s = s.replace(
          /\$\$[\s\S]*?\$\$|\$[^$]*\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g,
          " "
        );
        // replace commands with braced argument: \cmd[opt]{arg} or \cmd{arg} -> keep arg
        s = s.replace(/\\[a-zA-Z@]+\*?\s*(?:\[[^\]]*\])?\s*\{([^}]*)\}/g, "$1");
        // remove remaining commands like \cmd or \cmd* or \cmd[opt]
        s = s.replace(/\\[a-zA-Z@]+\*?\s*(?:\[[^\]]*\])?/g, " ");
        // remove leftover braces
        s = s.replace(/[{}]/g, " ");
        // collapse whitespace
        s = s.replace(/\s+/g, " ").trim();
        return s;
      }

      const cleaned = stripTex(paragraphMatch);
      const excerpt = cleaned.slice(0, 300);

      return { file, title, date, excerpt };
    })
  );

  return posts;
}

export default async function PostsPage() {
  const posts = await loadTexPosts();

  return (
    <div className="mt-4">
      {posts.length === 0 ? (
        <p className="mt-2 text-zinc-600">
          No .tex posts found in <code>/public/posts</code>.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((p) => {
            return (
              <a
                href={`/posts/render?file=${encodeURIComponent(p.file)}`}
                key={p.file}
              >
                <article className="rounded-lg hover:cursor-pointer py-3 px-4 hover:scale-[1.05] hover:shadow-xl transition-transform group">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xl font-semibold hover:underline">
                        {p.title}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-500">{p.date}</div>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600">{p.excerpt}...</p>
                  <div className="mt-2">
                    <p className="text-sm text-red-600 underline">
                      More Details
                    </p>
                  </div>
                </article>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
