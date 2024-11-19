import { Float } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei/core/MeshTransmissionMaterial";
import { useRef } from "react";
import * as THREE from "three";

type GlassBallProps = JSX.IntrinsicElements["group"];

export function GlassBall(props: GlassBallProps) {
  const glassSphere = useRef<THREE.Mesh>(null);

  return (
    <>
      <group {...props}>
        <Float floatIntensity={10} rotationIntensity={20}>
          <mesh ref={glassSphere} castShadow receiveShadow>
            <sphereGeometry args={[2, 32, 32]} />
            <MeshTransmissionMaterial
              color="white"
              roughness={0.2}
              thickness={2}
              distortion={1}
              anisotropicBlur={0.2}
              anisotropyRotation={2}
              transparent
            />
          </mesh>
          <mesh rotation={[0, 0, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"sky"} />
          </mesh>
          <mesh rotation={[0, -2, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"red"} />
          </mesh>
          <mesh rotation={[-2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"orange"} />
          </mesh>
        </Float>
      </group>
    </>
  );
}
