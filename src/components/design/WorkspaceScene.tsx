"use client";
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function WorkspaceScene({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Canvas>
      <ambientLight intensity={5} />
      <spotLight
        position={[1, 1, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.1}
      />
      <pointLight position={[10, 10, 10]} />
      <perspectiveCamera position={[10, 10, 12]} fov={25} />

      {children}
      <group>
        <OrbitControls makeDefault />
        <Grid
          position={[0, -0.01, 0]}
          args={[10, 10]}
          cellColor={"white"}
          cellSize={0.2}
          sectionColor={"green"}
          sectionSize={1}
        />
      </group>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
          labelColor="black"
        />
      </GizmoHelper>
    </Canvas>
  );
}
