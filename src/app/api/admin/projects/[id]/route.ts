import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function toArray(value: string | string[] | undefined): string[] | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = { ...body };
  if (body.technologies !== undefined) {
    updateData.technologies = toArray(body.technologies);
  }
  if (body.key_features !== undefined) {
    updateData.key_features = toArray(body.key_features);
  }
  delete updateData.id;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Project not found" },
      { status: error ? 500 : 404 }
    );
  }

  return NextResponse.json(data);
}