"use client";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function Scene({ children }: { children?: React.ReactNode }) {
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
