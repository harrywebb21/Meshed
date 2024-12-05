"use client";
import { getWorkspaceById } from "@/utils/queries/workspace";
import { useQuery } from "@tanstack/react-query";
import { Workspace } from "@/utils/supabase/types/dbTypes";
import Scene from "@/components/Scene";
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  PivotControls,
} from "@react-three/drei";

export default function WorkspacePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = params;

  const { data: workspace } = useQuery<Workspace>({
    queryKey: ["workspace", id],
    queryFn: async () => getWorkspaceById(id),
    enabled: !!id,
  });

  return (
    <div>
      <h1>Workspace: {workspace?.workspace_name} </h1>
      <div className="w-full h-svh">
        <Scene>
          <perspectiveCamera position={[10, 10, 12]} fov={25} />
          <PivotControls
            anchor={[-1, 1.1, -1]}
            axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
            hoveredColor={"white"}
          >
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[10, 1, 1]} />
              <meshBasicMaterial color="#04A5FF" />
            </mesh>
          </PivotControls>
          <group>
            <OrbitControls makeDefault />
            <Grid position={[0, -0.01, 0]} args={[10, 10]} />
          </group>
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
              labelColor="black"
            />
          </GizmoHelper>
        </Scene>
      </div>
    </div>
  );
}
