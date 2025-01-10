"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
// import { useControls } from "leva";

export default function Scene({ children }: { children?: React.ReactNode }) {
  // const { gridSize, ...gridConfig } = useControls({
  //   gridSize: [10.5, 10.5],
  //   cellSize: { value: 1, min: 0, max: 10, step: 0.1 },
  //   cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
  //   cellColor: "#1d1d1d",
  //   sectionSize: { value: 0.1, min: 0, max: 10, step: 0.1 },
  //   sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
  //   sectionColor: "#1e1e1e",
  //   fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
  //   fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
  //   followCamera: false,
  //   infiniteGrid: true,
  // });

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
      {children}
    </Canvas>
  );
}
