import { Holofoil } from "@/components/Holofoil";
import { PivotControls } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

interface CubeProps extends MeshProps {
  width: number;
  height: number;
  depth: number;
  colour: string;
  onClick?: () => void;
  showPivot?: boolean;
  onPositionChange?: (
    position: [number, number, number],
    rotation: [number, number, number]
  ) => void;
}

export const Cube = forwardRef<THREE.Mesh, CubeProps>(
  (
    {
      width,
      height,
      depth,
      colour,
      showPivot = false,
      onPositionChange,
      onClick,
      ...props
    }: CubeProps,
    ref: React.Ref<THREE.Mesh>
  ) => {
    const cubeRef = useRef<THREE.Mesh>(null);

    useImperativeHandle(ref, () => cubeRef.current as THREE.Mesh);

    const handleDrag = (local: THREE.Matrix4) => {
      if (cubeRef.current) {
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        local.decompose(position, quaternion, scale);

        cubeRef.current.position.copy(position);
        cubeRef.current.scale.copy(scale);

        const rotation = new THREE.Euler().setFromQuaternion(quaternion, "XYZ");
        cubeRef.current.rotation.copy(rotation);
        onPositionChange?.(
          [position.x, position.y, position.z],
          [rotation.x, rotation.y, rotation.z]
        );
      }
    };
    return (
      // <PivotControls
      //   anchor={[0, 0, 0]}
      //   axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
      //   hoveredColor={"white"}
      //   visible={showPivot}
      //   onDrag={handleDrag}
      // >
      <mesh {...props} onClick={onClick} ref={cubeRef}>
        <Holofoil>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color={colour} />
        </Holofoil>
      </mesh>
      // </PivotControls>
    );
  }
);
