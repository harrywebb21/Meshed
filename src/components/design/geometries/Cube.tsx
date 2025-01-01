import { PivotControls } from "@react-three/drei";
import { MeshProps, Vector3, Euler } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

interface CubeProps extends MeshProps {
  width: number;
  height: number;
  depth: number;
  colour: string | null;
  position: Vector3;
  rotation: Euler;
  onClick?: () => void;
  showPivot?: boolean;
  onPositionChange?: (position: Vector3, rotation: Euler) => void;
  wireframe?: boolean | undefined;
  showControls?: boolean;
}

export const Cube = ({
  width,
  height,
  depth,
  colour,
  wireframe = false,
  onClick,
  showControls = false,
  ...props
}: CubeProps) => {
  const cubeRef = useRef<THREE.Mesh>(null);

  return (
    <PivotControls
      anchor={[0, 0, 0]}
      axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
      hoveredColor={"white"}
      visible={showControls}
      disableAxes={!showControls}
      disableRotations={!showControls}
      disableScaling={!showControls}
      disableSliders={!showControls}
    >
      <mesh {...props} onClick={onClick} ref={cubeRef}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={colour || undefined}
          wireframe={wireframe}
        />
      </mesh>
    </PivotControls>
  );
};
