import { createClient } from "../supabase/client";
import { Workspace, WorkspaceUser } from "../supabase/types/dbTypes";
import { getUserByEmail } from "./profile";
import { sendEmail } from "./resend/emails";

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
      permission_type: "edit",
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

  data?.forEach(async (workspace) => {
    if (workspace.preview_img) {
      const { data: imgData, error: imgError } = await supabase.storage
        .from("workspace-previews")
        .createSignedUrl(workspace.preview_img, 86400);
      if (imgError) {
        console.error("Error fetching workspace preview:", imgError.message);
      }
      if (imgData) {
        workspace.preview_img = imgData;
      }
    }
  });
  if (error) {
    console.error("Error fetching workspaces:", error.message);
    throw error;
  }
  return data;
}

export async function getWorkspaceById(
  workspaceId: string | undefined
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

export async function inviteWorkspaceUser(
  workspace_id: string | undefined,
  email: string,
  permission_type: string
): Promise<WorkspaceUser> {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isAlreadyMember = await getWorkspaceUserById(workspace_id, user.id);
  if (isAlreadyMember && isAlreadyMember.id) {
    throw new Error("User is already a member of this workspace");
  }

  const { data, error } = await supabase
    .from("WorkspaceUser")
    .insert([
      {
        workspace_id,
        user_id: user.id,
        role: "member",
        permission_type,
      },
    ])
    .select()
    .single();
  const workspace = await getWorkspaceById(workspace_id);
  await sendEmail(user, workspace);
  if (error) {
    console.error("Error inviting user to workspace:", error.message);
    throw error;
  }
  return data[0];
}

export async function getWorkspaceUserById(
  workspaceId: string | undefined,
  userId: string
): Promise<WorkspaceUser> {
  const { data, error } = await supabase
    .from("WorkspaceUser")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)
    .single();

  if (
    error?.message === "JSON object requested, multiple (or no) rows returned"
  ) {
    return {} as WorkspaceUser;
  } else if (error) {
    console.error("Error fetching workspace user:", error.message);
    throw error;
  }

  return data;
}

export async function getWorkspaceUsers(
  workspaceId: string
): Promise<WorkspaceUser[]> {
  const { data, error } = await supabase
    .from("WorkspaceUser")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) {
    console.error("Error fetching workspace users:", error.message);
    throw error;
  }

  return data;
}

export async function getSharedWorkspaces(
  userId: string
): Promise<Workspace[]> {
  const { data, error } = await supabase
    .from("WorkspaceUser")
    .select("workspace_id")
    .eq("user_id", userId)
    .eq("role", "member");

  if (error) {
    console.error("Error fetching shared workspaces:", error.message);
    throw error;
  }

  const workspaceIds = data.map((workspace) => workspace.workspace_id);
  const { data: workspaces, error: error2 } = await supabase
    .from("Workspace")
    .select("*")
    .in("id", workspaceIds);

  workspaces?.forEach(async (workspace) => {
    if (workspace.preview_img) {
      const { data: imgData, error: imgError } = await supabase.storage
        .from("workspace-previews")
        .createSignedUrl(workspace.preview_img, 86400);
      if (imgError) {
        console.error("Error fetching workspace preview:", imgError.message);
      }
      if (imgData) {
        workspace.preview_img = imgData;
      }
    }
  });

  if (error2) {
    console.error("Error fetching shared workspaces:", error2.message);
    throw error2;
  }

  return workspaces;
}

export async function uploadWorkspacePreview(img: Blob, workspaceId: string) {
  let imgBlob = img;
  if (typeof img === "string") {
    const response = await fetch(img);
    imgBlob = await response.blob();
  }

  const { data, error } = await supabase.storage
    .from("workspace-previews")
    .upload(`workspace-${workspaceId}.png`, imgBlob, {
      upsert: true,
      contentType: "image/png",
    });

  if (error) {
    console.error("Error uploading workspace preview:", error.message);
    throw error;
  }

  if (data) {
    const { error: error2 } = await supabase
      .from("Workspace")
      .update({ preview_img: data.path })
      .eq("id", workspaceId);

    if (error2) {
      console.error("Error updating workspace preview:", error2.message);
      throw error2;
    }
  }

  return data;
}
