import fs from "fs";
import path from "path";
import ViewerClient from "../ViewerClient";

type Props = {
  params: { file: string };
};

export default async function TexFilePage({ params }: Props) {
  // params.file is treated as a slug (filename without .tex) to be export-friendly
  const slug = params?.file ?? "";
  if (typeof slug !== 'string' || slug.length === 0) {
    return <div className="text-red-600">Invalid post identifier</div>;
  }
  const filename = slug.endsWith('.tex') ? slug : `${slug}.tex`;
  const postsDir = path.join(process.cwd(), "public", "posts");
  const full = path.join(postsDir, filename);
  let tex = "";
  try {
    tex = await fs.promises.readFile(full, "utf8");
  } catch (e) {
    return <div className="text-red-600">File not found: {filename}</div>;
  }

  // Render client component with tex content
  return <ViewerClient tex={tex} filename={filename} />;
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'public', 'posts');
  try {
    const files = await fs.promises.readdir(postsDir);
    return files
      .filter((f) => f.endsWith('.tex'))
      .map((file) => ({ file: file.replace(/\.tex$/, '') }));
  } catch (e) {
    return [];
  }
}
