import { createClient } from "../supabase/client";
import { Mesh } from "../supabase/types/dbTypes";
import { CubeMeshData } from "../types";
// import { CubeMeshData, SphereMesh } from "../types";

const supabase = createClient();
export async function addMesh(meshData: Mesh): Promise<void> {
  const { data, error } = await supabase.from("Mesh").insert([
    {
      mesh_data: meshData.mesh_data,
      workspace_id: meshData.workspace_id,
      created_by: meshData.created_by,
      layer_name: meshData.layer_name,
      pos_x: meshData.pos_x,
      pos_y: meshData.pos_y,
      pos_z: meshData.pos_z,
      rot_x: meshData.rot_x,
      rot_y: meshData.rot_y,
      rot_z: meshData.rot_z,
      type: meshData.type,
    },
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
  pos_x?: number | null,
  pos_y?: number | null,
  pos_z?: number | null,
  rot_x?: number | null,
  rot_y?: number | null,
  rot_z?: number | null,
  colour?: string | null,
  wireframe?: boolean | null,
  mesh_data?: CubeMeshData | null
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
      mesh_data,
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
