import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "tech-stack.json");

type TechItem = {
  id: string;
  name: string;
  logo_url: string | null;
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

async function readItems(): Promise<TechItem[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeItems(items: TechItem[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  const items = await readItems();
  const sorted = [...items].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, logo_url } = body;

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const items = await readItems();

  const newItem: TechItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    logo_url: logo_url || null,
    created_at: new Date().toISOString(),
  };

  items.push(newItem);
  await writeItems(items);

  return NextResponse.json(newItem, { status: 201 });
}
