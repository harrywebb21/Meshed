import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas>
      <OrbitControls />
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
