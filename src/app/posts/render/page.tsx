import fs from "fs";
import path from "path";
import ViewerClient from "../ViewerClient";

type Props = { searchParams: { file?: string } };

export default async function RenderQueryPage({ searchParams }: Props) {
  // In this Next.js environment `searchParams` can be a Promise; unwrap it first.
  const sp = (await searchParams) || {};
  const file = sp.file;
  if (!file) return <div className="text-zinc-600">No file specified.</div>;

  const postsDir = path.join(process.cwd(), "public", "posts");
  const full = path.join(postsDir, file);
  let tex = "";
  try {
    tex = await fs.promises.readFile(full, "utf8");
  } catch (e: any) {
    return <div className="text-red-600">Error reading file: {String(e.message || e)}</div>;
  }

  return <ViewerClient tex={tex} filename={file} />;
}
