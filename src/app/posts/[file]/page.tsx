import fs from "fs";
import path from "path";
import ViewerClient from "../ViewerClient";

type Props = {
  params: { file: string };
};

export default async function TexFilePage({ params }: Props) {
  const filename = params.file;
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
