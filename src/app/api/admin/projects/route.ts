import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";

type ProjectInput = {
  title: string;
  description: string;
  live_url?: string | null;
  github_url?: string | null;
  technologies?: string | string[];
  key_features?: string | string[];
  image_url?: string | null;
  image_urls?: string[];
};

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function GET() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body: ProjectInput = await req.json();
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

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      live_url: live_url || null,
      github_url: github_url || null,
      technologies: toArray(technologies),
      key_features: toArray(key_features),
      image_url: image_url || null,
      image_urls: image_urls || [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}