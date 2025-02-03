"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mesh, Workspace } from "@/utils/supabase/types/dbTypes";
import { Cube } from "@/components/design/geometries/Cube";
import WorkspaceScene from "@/components/design/WorkspaceScene";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { addMesh, getMeshes } from "@/utils/queries/mesh";
import AddGeometriesMenu from "@/components/design/ui/AddGeometriesMenu";
import { useEffect, useState } from "react";
import { getWorkspaceById } from "@/utils/queries/workspace";
import ValuesMenu from "@/components/design/ui/ValuesMenu";
import WorkspaceValuesMenu from "@/components/design/ui/WorkspaceValuesMenu";
import { createClient } from "@/utils/supabase/client";
import { Sphere } from "@/components/design/geometries/Sphere";
import {
  CapsuleGeometry,
  ConeGeometry,
  CubeGeometry,
  CylinderGeometry,
  PlaneGeometry,
  RingGeometry,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
} from "@/utils/types";
import { Cylinder } from "@/components/design/geometries/Cylinder";
import { Plane } from "@/components/design/geometries/Plane";
import { Torus } from "@/components/design/geometries/Torus";
import { Cone } from "@/components/design/geometries/Cone";
import { Capsule } from "@/components/design/geometries/Capsule";
import { TorusKnot } from "@/components/design/geometries/TorusKnot";

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
    onError: () => {
      console.error("Error adding mesh");
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
    onError: () => {
      console.error("Error updating mesh counts");
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

  useEffect(() => {
    console.log("selectedGeometry", selectedGeometry);
  }, [selectedGeometry]);
  // FUNCTIONS / HANDLERS
  const handleCreateGeometry = (
    newGeometry:
      | CubeGeometry
      | SphereGeometry
      | CylinderGeometry
      | PlaneGeometry
      | TorusGeometry
      | ConeGeometry
      | CapsuleGeometry
      | RingGeometry
      | TorusKnotGeometry
  ) => {
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
        arc: "arc" in newGeometry ? newGeometry.arc ?? Math.PI * 2 : null,
        cap_segments:
          "capSegments" in newGeometry ? newGeometry.capSegments ?? 8 : null,
        depth: "depth" in newGeometry ? newGeometry.depth ?? 1 : null,
        height: "height" in newGeometry ? newGeometry.height ?? 1 : null,
        length: "length" in newGeometry ? newGeometry.length ?? 1 : null,
        radius: "radius" in newGeometry ? newGeometry.radius ?? 1 : null,
        radius_bottom:
          "radiusBottom" in newGeometry
            ? newGeometry.radiusBottom ?? null
            : null,
        radius_top:
          "radiusTop" in newGeometry ? newGeometry.radiusTop ?? null : null,
        radial_segments:
          "radialSegments" in newGeometry
            ? newGeometry.radialSegments ?? 8
            : null,
        tube: "tube" in newGeometry ? newGeometry.tube ?? 1 : null,
        tubular_segments:
          "tubularSegments" in newGeometry
            ? newGeometry.tubularSegments ?? 32
            : null,
        width: "width" in newGeometry ? newGeometry.width ?? 1 : null,
        width_segments:
          "widthSegments" in newGeometry
            ? newGeometry.widthSegments ?? 32
            : null,
        height_segments:
          "heightSegments" in newGeometry
            ? newGeometry.heightSegments ?? 32
            : null,
        depth_segments:
          "depthSegments" in newGeometry
            ? newGeometry.depthSegments ?? 32
            : null,
        inner_radius:
          "innerRadius" in newGeometry ? newGeometry.innerRadius ?? null : null,
        open_ended:
          "openEnded" in newGeometry ? newGeometry.openEnded ?? null : null,
        outer_radius:
          "outerRadius" in newGeometry ? newGeometry.outerRadius ?? null : null,
        p: "p" in newGeometry ? newGeometry.p ?? 2 : null,
        q: "q" in newGeometry ? newGeometry.q ?? 3 : null,
        theta_length:
          "thetaLength" in newGeometry ? newGeometry.thetaLength ?? 1 : null,
        theta_start:
          "thetaStart" in newGeometry ? newGeometry.thetaStart ?? 0 : null,
        theta_segments:
          "thetaSegments" in newGeometry
            ? newGeometry.thetaSegments ?? 8
            : null,
        phi_length:
          "phiLength" in newGeometry
            ? newGeometry.phiLength ?? Math.PI * 2
            : null,
        phi_segments:
          "phiSegments" in newGeometry ? newGeometry.phiSegments ?? 8 : null,
        phi_start: "phiStart" in newGeometry ? newGeometry.phiStart ?? 0 : null,
        scale_x: newGeometry.scale_x ?? null,
        scale_y: newGeometry.scale_y ?? null,
        scale_z: newGeometry.scale_z ?? null,
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
        selectedGeometry={selectedGeometry}
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
                />
              );
            case "sphere":
              return (
                <Sphere
                  key={geometry.id}
                  data={geometry}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                />
              );
            case "cylinder":
              return (
                <Cylinder
                  key={geometry.id}
                  data={geometry}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                />
              );
            case "plane":
              return (
                <Plane
                  key={geometry.id}
                  data={geometry}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                />
              );
            case "torus":
              return (
                <Torus
                  key={geometry.id}
                  data={geometry}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                />
              );
            case "cone":
              return (
                <Cone
                  key={geometry.id}
                  data={geometry}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                />
              );
            case "capsule":
              return (
                <Capsule
                  key={geometry.id}
                  data={geometry}
                  wireframe={geometry.wireframe ?? false}
                  showControls={selectedGeometry?.id === geometry.id}
                  onClick={() => setSelectedGeometry(geometry)}
                />
              );
            case "torusKnot":
              return (
                <TorusKnot
                  key={geometry.id}
                  data={geometry}
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
