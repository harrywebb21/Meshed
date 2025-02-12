"use client";
import { useEffect, useState } from "react";
import { Workspace } from "../supabase/types/dbTypes";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById } from "../queries/workspace";

export function useWorkspace(workspaceId?: string) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  const { data, error } = useQuery<Workspace>({
    enabled: !!workspace,
    queryKey: ["workspace", workspace?.id],
    queryFn: async () => getWorkspaceById(workspaceId!),
  });

  useEffect(() => {
    if (data) {
      setWorkspace(data);
    }
  }, [data]);
  return { workspace, error };
}
