import { PivotControls } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

interface CubeProps extends MeshProps {
  width: number;
  height: number;
  depth: number;
  colour: string;
  onClick?: () => void;
  showPivot?: boolean;
  onPositionChange?: (position: [number, number, number]) => void;
}

export default function Cube({
  width,
  height,
  depth,
  colour,
  showPivot = true,
  onPositionChange,
  onClick,
  ...props
}: CubeProps) {
  const cubeRef = React.useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (cubeRef.current && showPivot) {
      const position = cubeRef.current.position;
      onPositionChange?.([position.x, position.y, position.z]);
    }
  });

  return (
    <PivotControls
      anchor={[-1, 1.1, -1]}
      axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
      hoveredColor={"white"}
      visible={showPivot}
    >
      <mesh {...props} onClick={onClick}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={colour} />
      </mesh>
    </PivotControls>
  );
}
