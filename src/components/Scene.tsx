"use client";
import { Environment } from "@react-three/drei";
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
    <Canvas gl={{ toneMapping: THREE.NoToneMapping }} shadows>
      <ambientLight intensity={5} />
      <spotLight
        position={[1, 1, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.1}
      />
      <ambientLight intensity={0.9} position={[0, 10, 5]} />
      <directionalLight position={[0, -10, 5]} intensity={1} color="white" />
      <ambientLight intensity={1} position={[0, 0, 0]} color="white" />
      {/* <directionalLight
        color="white"
        position={[0, 0, -1]}
        intensity={1}
        rotation={[2, 2, 2]}
        castShadow
      />

      <directionalLight
        color="white"
        position={[0, 1, 5]}
        intensity={1}
        castShadow
      />

      <directionalLight
        color="white"
        position={[1, 0.5, 5]}
        intensity={1}
        castShadow
      />

      <directionalLight
        color="white"
        position={[-1, 0.5, 5]}
        intensity={1}
        castShadow
      /> */}
      <pointLight
        color="white"
        position={[0, 0, -10]}
        castShadow
        shadow-mapSize-width={2000}
        shadow-mapSize-height={3000}
      />
      <Environment preset="warehouse" />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
}
