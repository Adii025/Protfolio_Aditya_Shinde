import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "projects.json");

type Project = {
  id: string;
  title: string;
  description: string;
  live_url: string | null;
  github_url: string | null;
  technologies: string;
  key_features: string;
  image_url: string | null;
  image_urls: string[];
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

async function readProjects(): Promise<Project[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeProjects(projects: Project[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), "utf-8");
}

export async function GET() {
  const projects = await readProjects();
  const sorted = [...projects].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    title,
    description,
    live_url,
    github_url,
    technologies,
    key_features,
    image_url,
    image_urls,
  } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }

  const projects = await readProjects();
  const newProject: Project = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title,
    description,
    live_url: live_url || null,
    github_url: github_url || null,
    technologies: technologies || "",
    key_features: key_features || "",
    image_url: image_url || null,
    image_urls: image_urls || [],
    created_at: new Date().toISOString(),
  };

  projects.push(newProject);
  await writeProjects(projects);

  return NextResponse.json(newProject, { status: 201 });
}