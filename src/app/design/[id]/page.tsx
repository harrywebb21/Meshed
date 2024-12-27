"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mesh } from "@/utils/supabase/types/dbTypes";
import { Cube } from "@/components/design/geometries/Cube";
import { CubeMesh } from "@/utils/types";
import WorkspaceScene from "@/components/design/WorkspaceScene";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { addMesh, getMeshes } from "@/utils/queries/mesh";
import CubeValuesMenu from "@/components/design/ui/CubeValuesMenu";
import AddGeometriesMenu from "@/components/design/ui/AddGeometriesMenu";
import { Euler, Vector3 } from "three";
import { useEffect, useState } from "react";

export default function WorkspacePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  //Get the workspace id from the params
  const { id } = params;
  const user = useAuthUser();
  const profile = useGetProfile(user?.id);
  //
  //STATES
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [geometries, setGeometries] = useState<Mesh[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  //
  //QUERIES AND DATA FETCHING
  const queryClient = useQueryClient();
  // const { data: workspaceData } = useQuery<Workspace>({
  //   queryKey: ["workspace", id],
  //   queryFn: async () => getWorkspaceById(id),
  //   enabled: !!id,
  // });
  const { data: meshData, isLoading: meshLoading } = useQuery({
    queryKey: ["meshes", id],
    queryFn: async () => getMeshes(id),
    enabled: !!id,
  });
  const newMeshMutation = useMutation({
    mutationFn: async (newGeometry: CubeMesh) => {
      await addMesh(profile.profile!.id, id, newGeometry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meshes", id],
      });
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Error adding mesh:", error);
    },
  });

  useEffect(() => {
    if (meshData) {
      // Transform meshData to match CubeMesh type if necessary
      setGeometries(meshData);
    }
  }, [meshData]);
  const handleCreateGeometry = (newGeometry: CubeMesh) => {
    try {
      setIsLoading(true);
      newMeshMutation.mutate(newGeometry);
    } catch (error) {
      console.error("Error adding mesh:", error);
    }
  };

  if (meshLoading || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-svh">
      <CubeValuesMenu />
      <AddGeometriesMenu onCreateGeometry={handleCreateGeometry} />
      <WorkspaceScene>
        {geometries.map((geometry: Mesh) => {
          switch ((geometry.mesh_data as { type: string }).type) {
            case "cube":
              return (
                <Cube
                  key={geometry.id}
                  position={
                    (
                      geometry.mesh_data as unknown as {
                        position: Vector3;
                      }
                    ).position
                  }
                  rotation={
                    (geometry.mesh_data as unknown as { rotation: Euler })
                      .rotation
                  }
                  width={(geometry.mesh_data as { width: number }).width}
                  height={(geometry.mesh_data as { height: number }).height}
                  depth={(geometry.mesh_data as { depth: number }).depth}
                  colour={(geometry.mesh_data as { colour: string }).colour}
                  wireframe={
                    (geometry.mesh_data as { wireframe: boolean }).wireframe
                  }
                />
              );
            default:
              return null;
          }
        })}
      </WorkspaceScene>
    </div>
  );
}
