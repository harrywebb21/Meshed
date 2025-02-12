import { createClient } from "../supabase/client";
import { Workspace } from "../supabase/types/dbTypes";

const supabase = createClient();

export async function createWorkspace({
  workspaceName,
  ownerId,
}: {
  workspaceName: string;
  ownerId: string;
}): Promise<void> {
  const { data, error } = await supabase
    .from("Workspace")
    .insert([
      {
        workspace_name: workspaceName,
        owner_id: ownerId,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.error("Error creating workspace:", error.message);
    return;
  }

  if (!data) {
    console.error("Error creating workspace: no data returned");
    return;
  }
  const { error: error2 } = await supabase.from("WorkspaceUser").insert([
    {
      workspace_id: data.id,
      user_id: ownerId,
      role: "owner",
    },
  ]);

  if (error2) {
    console.error("Error creating workspace user:", error2.message);
    return;
  }

  console.info("Workspace created successfully");
}

export async function getWorkspaces(userId: string): Promise<Workspace[]> {
  const { data, error } = await supabase
    .from("Workspace")
    .select("*")
    .eq("owner_id", userId);

  if (error) {
    console.error("Error fetching workspaces:", error.message);
    throw error;
  }

  return data;
}

export async function getWorkspaceById(
  workspaceId: string
): Promise<Workspace> {
  const { data, error } = await supabase
    .from("Workspace")
    .select("*")
    .eq("id", workspaceId)
    .single();

  if (error) {
    console.error("Error fetching workspaces:", error.message);
    throw error;
  }

  return data;
}
