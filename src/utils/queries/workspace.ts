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
  const { error } = await supabase.from("Workspace").insert([
    {
      workspace_name: workspaceName,
      owner_id: ownerId,
    },
  ]);

  if (error) {
    console.error("Error creating workspace:", error.message);
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
