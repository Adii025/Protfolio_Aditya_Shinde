import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB — kept smaller since base64 adds ~33% size overhead in the DB

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large: ${file.name} (max 2MB)` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    // This data URL can be:
    // (a) returned directly and saved into your certificates/projects table
    //     as the value for an `image` column (type: text)
    // (b) rendered directly in an <img src={dataUrl} /> tag on your site —
    //     no separate file URL needed at all

    urls.push(dataUrl);
  }

  return NextResponse.json({ urls });
}