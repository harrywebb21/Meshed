import { Mesh } from "@/utils/supabase/types/dbTypes";
import { PivotControls } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

interface CubeProps extends MeshProps {
  data: Mesh;
  onClick?: () => void;
  showPivot?: boolean;
  onPivotChange?: (
    position: THREE.Vector3,
    rotation: [number, number, number],
    scale: THREE.Vector3
  ) => void;
  wireframe?: boolean | undefined;
  showControls?: boolean;
}

export const Cube = ({
  data,
  wireframe = false,
  onClick,
  showControls = false,
  onPivotChange,
  ...props
}: CubeProps) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const eulerToArray = (euler: THREE.Euler): [number, number, number] => {
    return [euler.x, euler.y, euler.z];
  };

  const handlePivotChange = (
    newPosition: THREE.Vector3,
    newRotation: THREE.Euler,
    newScale: THREE.Vector3
  ) => {
    if (onPivotChange) {
      onPivotChange(newPosition, eulerToArray(newRotation), newScale);
    }
  };

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
      userData={{ id: props.uuid }}
      onDrag={(local) => {
        if (!cubeRef.current) return;
        const currentPosition =
          cubeRef.current?.position || new THREE.Vector3();
        const currentRotation = cubeRef.current?.rotation || new THREE.Euler();
        const currentScale = cubeRef.current?.scale || new THREE.Vector3();
        const matrix = new THREE.Matrix4();
        matrix.compose(
          currentPosition,
          new THREE.Quaternion().setFromEuler(currentRotation),
          currentScale
        );
        matrix.multiply(local);

        const newPosition = new THREE.Vector3().setFromMatrixPosition(matrix);
        const newRotation = new THREE.Euler().setFromRotationMatrix(matrix);
        const newScale = new THREE.Vector3().setFromMatrixScale(matrix);
        handlePivotChange(newPosition, newRotation, newScale);
      }}
    >
      <mesh
        {...props}
        onClick={onClick}
        position={[data.pos_x ?? 0, data.pos_y ?? 0, data.pos_z ?? 0]}
        rotation={[data.rot_x ?? 0, data.rot_y ?? 0, data.rot_z ?? 0]}
        ref={cubeRef}
        scale={[data.scale_x ?? 1, data.scale_y ?? 1, data.scale_z ?? 1]}
      >
        <boxGeometry
          args={[
            data.width ?? undefined,
            data.height ?? undefined,
            data.depth ?? undefined,
          ]}
        />
        <meshStandardMaterial
          color={data.colour ?? undefined}
          wireframe={wireframe}
        />
      </mesh>
    </PivotControls>
  );
};
