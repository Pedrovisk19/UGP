"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ProjectSubmission } from "@/types/ugp.types";

export async function getProjectSubmission(
  projectId: number,
): Promise<ProjectSubmission | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("project_submissions")
    .select("*")
    .eq("project_id", projectId)
    .eq("created_by_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);
  return (data?.[0] as ProjectSubmission | undefined) ?? null;
}

export async function submitProject(data: {
  projectId: number;
  githubUrl: string;
  productionUrl?: string;
}): Promise<{ id?: string; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  if (!data.githubUrl.trim()) return { error: "GitHub URL é obrigatória" };

  const { data: inserted, error } = await supabase
    .from("project_submissions")
    .insert({
      project_id: data.projectId,
      github_url: data.githubUrl,
      production_url: data.productionUrl?.trim() || null,
      status: "pending",
      submitted_at: new Date().toISOString(),
      created_by_id: user.id,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  revalidatePath(`/projects/${data.projectId}`, "page");
  return { id: inserted.id };
}

export async function advanceProjectLevel(data: {
  projectId: number;
  xpGain: number;
  newLevel: string;
}): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase
    .from("profiles")
    .update({
      xp_points: (await currentXp(supabase, user.id)) + data.xpGain,
      current_level: data.newLevel,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return {};
}

async function currentXp(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<number> {
  const { data } = await supabase
    .from("profiles")
    .select("xp_points")
    .eq("id", userId)
    .single();
  return data?.xp_points ?? 0;
}
