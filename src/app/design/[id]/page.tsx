"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mesh, Workspace } from "@/utils/supabase/types/dbTypes";
import { Cube } from "@/components/design/geometries/Cube";
import { CubeMeshData, SphereMeshData } from "@/utils/types";
import WorkspaceScene from "@/components/design/WorkspaceScene";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { addMesh, getMeshes } from "@/utils/queries/mesh";
import AddGeometriesMenu from "@/components/design/ui/AddGeometriesMenu";
import { Euler, Vector3 } from "three";
import { useEffect, useState } from "react";
import { getWorkspaceById } from "@/utils/queries/workspace";
import ValuesMenu from "@/components/design/ui/ValuesMenu";
import WorkspaceValuesMenu from "@/components/design/ui/WorkspaceValuesMenu";
import { createClient } from "@/utils/supabase/client";
import { Sphere } from "@/components/design/geometries/Sphere";

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
  const [selectedGeometry, setSelectedGeometry] = useState<Mesh | null>(null);
  const [geometries, setGeometries] = useState<Mesh[]>([]);
  //
  //QUERIES AND DATA FETCHING
  const queryClient = useQueryClient();
  const supabase = createClient();
  const { data: workspaceData, isLoading: workspaceLoading } =
    useQuery<Workspace>({
      queryKey: ["workspace", id],
      queryFn: async () => getWorkspaceById(id),
      enabled: !!id,
    });
  const { data: meshData, isLoading: meshLoading } = useQuery({
    queryKey: ["meshes", id],
    queryFn: async () => getMeshes(id),
    enabled: !!id,
  });
  useEffect(() => {
    const channel = supabase
      .channel("meshes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Mesh" },
        (payload) => {
          // queryClient.invalidateQueries({
          //   queryKey: ["meshes", id],
          // });
          console.log("Meshes updated", payload);
          setGeometries((prev) => {
            const newGeometries = prev.filter(
              (mesh) => mesh.id !== (payload.new as Mesh).id
            );
            return [...newGeometries, payload.new as Mesh];
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient, id, setGeometries]);
  const newMeshMutation = useMutation({
    mutationFn: async (newGeometry: Mesh) => {
      await addMesh(newGeometry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meshes", id],
      });
    },
    onError: (error) => {
      console.error("Error adding mesh:", error);
    },
  });

  useEffect(() => {
    if (meshData) {
      setGeometries(meshData);
    }
  }, [meshData]);

  const handleCreateGeometry = (newGeometry: CubeMeshData | SphereMeshData) => {
    try {
      const newMesh = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        created_by: profile.profile!.id,
        workspace_id: id,
        type: (newGeometry as { type: string }).type,
        layer_name:
          (newGeometry as { type: string }).type +
          " " +
          (geometries.length + 1),
        mesh_data: {
          ...newGeometry,
        },
        colour: (newGeometry as unknown as { colour: string }).colour,
        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
        rot_x: 0,
        rot_y: 0,
        rot_z: 0,
        wireframe: false,
      };
      newMeshMutation.mutate(newMesh);
    } catch (error) {
      console.error("Error adding mesh:", error);
    }
  };

  if (workspaceLoading) return <div>Loading...</div>;
  if (meshLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-svh">
      <WorkspaceValuesMenu
        workspaceData={workspaceData}
        geometries={geometries}
        returnSelectedGeometry={setSelectedGeometry}
      />
      {selectedGeometry && (
        <ValuesMenu meshData={selectedGeometry} workspaceId={id} />
      )}
      <AddGeometriesMenu onCreateGeometry={handleCreateGeometry} />
      <WorkspaceScene>
        {geometries.map((geometry: Mesh) => {
          switch (geometry.type) {
            case "cube":
              return (
                <Cube
                  key={geometry.id}
                  position={
                    [
                      geometry.pos_x,
                      geometry.pos_y,
                      geometry.pos_z,
                    ] as unknown as Vector3
                  }
                  rotation={
                    [
                      geometry.rot_x,
                      geometry.rot_y,
                      geometry.rot_z,
                    ] as unknown as Euler
                  }
                  width={(geometry.mesh_data as { width: number }).width}
                  height={(geometry.mesh_data as { height: number }).height}
                  depth={(geometry.mesh_data as { depth: number }).depth}
                  colour={geometry.colour}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                />
              );
            case "sphere":
              return (
                <Sphere
                  key={geometry.id}
                  position={
                    [
                      geometry.pos_x,
                      geometry.pos_y,
                      geometry.pos_z,
                    ] as unknown as Vector3
                  }
                  rotation={
                    [
                      geometry.rot_x,
                      geometry.rot_y,
                      geometry.rot_z,
                    ] as unknown as Euler
                  }
                  widthSegments={
                    (geometry.mesh_data as { widthSegments: number })
                      .widthSegments
                  }
                  heightSegments={
                    (geometry.mesh_data as { heightSegments: number })
                      .heightSegments
                  }
                  radius={(geometry.mesh_data as { radius: number }).radius}
                  colour={geometry.colour}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
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
