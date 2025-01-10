import { createClient } from "../supabase/client";
import { Mesh } from "../supabase/types/dbTypes";
// import { CubeMeshData, SphereMesh } from "../types";

const supabase = createClient();
export async function addMesh(meshData: Mesh): Promise<void> {
  const { data, error } = await supabase.from("Mesh").insert([meshData]);
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
  pos_x?: number | null,
  pos_y?: number | null,
  pos_z?: number | null,
  rot_x?: number | null,
  rot_y?: number | null,
  rot_z?: number | null,
  colour?: string | null,
  scale_x?: number | null,
  scale_y?: number | null,
  scale_z?: number | null,
  wireframe?: boolean | null
): Promise<void> {
  const { data, error } = await supabase
    .from("Mesh")
    .update({
      colour,
      pos_x,
      pos_y,
      pos_z,
      rot_x,
      rot_y,
      rot_z,
      scale_x,
      scale_y,
      scale_z,
      wireframe,
    })
    .eq("id", meshId);
  if (data) {
    console.log(data);
  }
  if (error) {
    throw error;
  }
}
