"use client";
import { getWorkspaceById } from "@/utils/queries/workspace";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mesh, Workspace } from "@/utils/supabase/types/dbTypes";
import { Cube } from "@/components/design/geometries/Cube";
import { CubeMesh } from "@/utils/types";
import WorkspaceScene from "@/components/design/WorkspaceScene";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { addMesh, getMeshes } from "@/utils/queries/mesh";
import CubeValuesMenu from "@/components/design/ui/CubeValuesMenu";
import AddGeometriesMenu from "@/components/design/ui/AddGeometriesMenu";
import { Euler, Vector3 } from "three";

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
  //

  //QUERIES AND DATA FETCHING
  const queryClient = useQueryClient();

  const { data: workspaceData } = useQuery<Workspace>({
    queryKey: ["workspace", id],
    queryFn: async () => getWorkspaceById(id),
    enabled: !!id,
  });

  const { data: meshData } = useQuery({
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
    },
  });

  //

  const handleCreateGeometry = (newGeometry: CubeMesh) => {
    try {
      newMeshMutation.mutate(newGeometry);
    } catch (error) {
      console.error("Error adding mesh:", error);
    }
  };

  return (
    <>
      <CubeValuesMenu />
      <AddGeometriesMenu onCreateGeometry={handleCreateGeometry} />

      <div className="w-full h-svh">
        <WorkspaceScene>
          {meshData?.map((geometry: Mesh, index) => {
            switch ((geometry.mesh_data as { type: string }).type) {
              case "cube":
                return (
                  <Cube
                    key={index}
                    // showPivot={selectedIndex === index}
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
                    workspaceId={""}
                    userId={""} // onPositionChange={(position, rotation) =>
                    //   handlePositionChange(index, position, rotation)
                    // }
                  />
                );
              default:
                return null;
            }
          })}
        </WorkspaceScene>
      </div>
    </>
  );
}
