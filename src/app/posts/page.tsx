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
      const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.tex$/, "");

      // simple excerpt: first paragraph or first 200 chars
      const paragraphMatch = raw.split(/\r?\n\r?\n/).find((p) => p.trim().length > 0) ?? "";
      const excerpt = paragraphMatch.replace(/\s+/g, " ").trim().slice(0, 300);

      return { file, title, excerpt };
    })
  );

  return posts;
}

export default async function PostsPage() {
  const posts = await loadTexPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold">Posts</h1>

      {posts.length === 0 ? (
        <p className="mt-2 text-zinc-600">No .tex posts found in <code>/public/posts</code>.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {posts.map((p) => (
            <article key={p.file} className="rounded-lg border bg-white p-4">
              <a href={`/posts/${encodeURIComponent(p.file)}`} className="text-lg font-semibold text-foreground">
                {p.title}
              </a>
              <p className="mt-2 text-sm text-zinc-600">{p.excerpt}...</p>
              <div className="mt-2">
                <a
                  className="text-sm text-blue-600 underline"
                  href={`/posts/render?file=${encodeURIComponent(p.file)}`}
                >
                  Preview
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
