import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "certificates.json");

type Certificate = {
  id: string;
  title: string;
  image_url: string | null;
  certificate_url: string | null;
  created_at: string;
};

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readItems(): Promise<Certificate[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeItems(items: Certificate[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const items = await readItems();

  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  items[index] = { ...items[index], ...body, id };
  await writeItems(items);

  return NextResponse.json(items[index]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const items = await readItems();
  const filtered = items.filter((i) => i.id !== id);

  if (filtered.length === items.length) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  await writeItems(filtered);
  return NextResponse.json({ success: true });
}
