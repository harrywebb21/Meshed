import { createClient } from "../supabase/client";
import { Mesh } from "../supabase/types/dbTypes";
// import { CubeMeshData, SphereMesh } from "../types";

const supabase = createClient();

export async function addMesh(meshData: Mesh): Promise<void> {
  const { error } = await supabase.from("Mesh").insert([meshData]);

  if (error) {
    throw error;
  }
}

export async function getMeshes(workspaceId: string): Promise<Mesh[]> {
  const { data, error } = await supabase
    .from("Mesh")
    .select("*")
    .eq("workspace_id", workspaceId);
  if (error) {
    throw error;
  }
  return data;
}

export async function updateMesh(
  meshId: string,
  meshData: Partial<Mesh>
): Promise<void> {
  const { error } = await supabase
    .from("Mesh")
    .update({
      ...meshData,
      updated_at: new Date(),
    })
    .eq("id", meshId);

  if (error) {
    throw error;
  }
}

export async function deleteMesh(meshId: string): Promise<void> {
  const { error } = await supabase.from("Mesh").delete().eq("id", meshId);

  if (error) {
    throw error;
  }
}
