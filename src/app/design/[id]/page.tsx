"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mesh, Workspace } from "@/utils/supabase/types/dbTypes";
import { Cube } from "@/components/design/geometries/Cube";
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
import { CubeGeometry, SphereGeometry } from "@/utils/types";

export default function WorkspacePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  //Get the workspace id from the params
  const { id } = params;
  const user = useAuthUser();
  const profile = useGetProfile(user?.id);

  //STATES
  const [selectedGeometry, setSelectedGeometry] = useState<Mesh | null>(null);
  const [geometries, setGeometries] = useState<Mesh[]>([]);

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

  // MUTATIONS
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
  const updateMeshCountMutation = useMutation({
    mutationFn: async (newMeshCounts: { [key: string]: number }) => {
      await supabase
        .from("Workspace")
        .update({ mesh_counts: newMeshCounts })
        .eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", id],
      });
    },
    onError: (error) => {
      console.error("Error updating mesh counts:", error);
    },
  });

  // SUBSCRIPTIONS - Realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("meshes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Mesh" },
        (payload) => {
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

  // EFFECTS
  useEffect(() => {
    if (meshData) {
      setGeometries(meshData);
    }
  }, [meshData]);

  // FUNCTIONS / HANDLERS
  const handleCreateGeometry = (newGeometry: CubeGeometry | SphereGeometry) => {
    try {
      const meshCounts: { [key: string]: number } =
        (workspaceData?.mesh_counts as { [key: string]: number }) ?? {};
      const meshType = newGeometry?.type;

      const currentMeshCount = meshCounts[meshType] ?? 0;
      const newMeshCount = currentMeshCount + 1;
      meshCounts[meshType] = newMeshCount;

      const newMesh = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        created_by: profile.profile!.id,
        workspace_id: id,
        type: newGeometry.type,
        layer_name: `${newGeometry.type} ${newMeshCount}`,
        colour: newGeometry.colour,
        pos_x: newGeometry.pos_x,
        pos_y: newGeometry.pos_y,
        pos_z: newGeometry.pos_z,
        rot_x: newGeometry.rot_x ?? null,
        rot_y: newGeometry.rot_y ?? null,
        rot_z: newGeometry.rot_z ?? null,
        wireframe: newGeometry.wireframe,
        arc: null,
        cap_segments: null,
        depth: null,
        height: null,
        length: null,
        radius: null,
        radius_bottom: null,
        radius_top: null,
        radial_segments: null,
        tube: null,
        tubular_segments: null,
        width: null,
        width_segments: null,
        height_segments: null,
        depth_segments: null,
        inner_radius: null,
        open_ended: null,
        outer_radius: null,
        p: null,
        q: null,
        theta_length: null,
        theta_start: null,
        theta_segments: null,
        phi_length: null,
        phi_segments: null,
        phi_start: null,
        scale_x: null,
        scale_y: null,
        scale_z: null,
      };

      newMeshMutation.mutate(newMesh);
      updateMeshCountMutation.mutate(meshCounts);
    } catch (error) {
      console.error("Error adding mesh:", error);
    }
  };

  if (workspaceLoading) return <div>Loading...</div>;
  if (meshLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-svh relative">
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
                  data={geometry}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                  onPivotChange={(position, rotation, scale) => {
                    console.log("Position change", position, rotation, scale);
                  }}
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
                  widthSegments={geometry.width_segments}
                  heightSegments={geometry.height_segments}
                  radius={geometry.radius}
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
