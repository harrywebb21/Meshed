"use client";
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(5, 1, 5);
    (camera as THREE.PerspectiveCamera).fov = 25;
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

export default function WorkspaceScene({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
      <ambientLight intensity={5} />
      <spotLight
        position={[1, 1, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.1}
      />
      <pointLight position={[10, 10, 10]} />
      {/* <perspectiveCamera position={[10, 10, 12]} fov={25} /> */}
      <CameraSetup />

      {children}
      <group>
        <OrbitControls makeDefault />
        <Grid
          position={[0, 0, 0]}
          args={[100, 100]}
          fadeDistance={100}
          fadeStrength={10}
          cellColor={"white"}
          cellSize={0.2}
          sectionColor={"white"}
          sectionSize={1}
          sectionThickness={0.5}
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
