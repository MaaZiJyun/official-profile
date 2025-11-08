import fs from "fs";
import path from "path";
import RenderClient from "../../RenderClient";

type Props = { params: { file: string } };

export default async function RenderTexPage({ params }: Props) {
  const filename = params.file;
  const postsDir = path.join(process.cwd(), "public", "posts");
  const full = path.join(postsDir, filename);
  let tex = "";
  try {
    tex = await fs.promises.readFile(full, "utf8");
  } catch (e: any) {
    return (
      <div className="text-red-600">
        Error reading file <strong>{filename}</strong>: {String(e.message || e)}
      </div>
    );
  }

  return <RenderClient tex={tex} filename={filename} />;
}
