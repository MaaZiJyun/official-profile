import fs from "fs";
import path from "path";

type Post = {
  file: string;
  title: string;
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
      const title = titleMatch
        ? titleMatch[1].trim()
        : file.replace(/\.tex$/, "");

      // simple excerpt: take first non-empty paragraph, but strip LaTeX markup
      const paragraphMatch =
        raw.split(/\r?\n\r?\n/).find((p) => p.trim().length > 0) ?? "";

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

      return { file, title, excerpt };
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
              <article
                key={p.file}
                className="hover:border-l-2 hover:border-red-600 py-2 px-4"
              >
                <a
                  href={`/posts/render?file=${encodeURIComponent(p.file)}`}
                  className="text-xl font-semibold text-foreground"
                >
                  {p.title}
                </a>
                <p className="mt-2 text-sm text-zinc-600">{p.excerpt}...</p>
                <div className="mt-2">
                  <a
                    className="text-sm text-red-600 underline"
                    href={`/posts/render?file=${encodeURIComponent(p.file)}`}
                  >
                    Preview
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
