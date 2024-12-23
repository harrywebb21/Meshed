import { createClient } from "../supabase/client";
import { Mesh } from "../supabase/types/dbTypes";
import { CubeMesh } from "../types";

const supabase = createClient();
export async function addMesh(
  userId: string,
  workspaceId: string,
  meshData: CubeMesh
): Promise<void> {
  const { data, error } = await supabase
    .from("Mesh")
    .insert([
      { mesh_data: meshData, workspace_id: workspaceId, created_by: userId },
    ]);
  if (data) {
    console.log(data);
  }
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
  meshData: CubeMesh
): Promise<void> {
  const { data, error } = await supabase
    .from("Mesh")
    .update({ mesh_data: meshData })
    .eq("id", meshId);
  if (data) {
    console.log(data);
  }
  if (error) {
    throw error;
  }
}
