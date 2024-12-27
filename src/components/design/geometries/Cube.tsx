import { PivotControls } from "@react-three/drei";
import { MeshProps, Vector3, Euler } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

interface CubeProps extends MeshProps {
  width: number;
  height: number;
  depth: number;
  colour: string;
  position: Vector3;
  rotation: Euler;
  onClick?: () => void;
  showPivot?: boolean;
  onPositionChange?: (position: Vector3, rotation: Euler) => void;
  wireframe?: boolean;
}

export const Cube = ({
  width,
  height,
  depth,
  colour,
  wireframe = false,
  onClick,
  ...props
}: CubeProps) =>
  // ref: React.Ref<THREE.Mesh>
  {
    const cubeRef = useRef<THREE.Mesh>(null);

    // const updateMeshQuery = useMutation({
    //   mutationFn: async () =>
    //     await updateMesh(cubeRef.current.uuid, {
    //       width,
    //       height,
    //       depth,
    //       colour,
    //       position,
    //       rotation,
    //     }),
    //   onSuccess: () => {
    //     console.log("Mesh updated successfully");
    //   },
    // });

    // useEffect(() => {
    //   updateMeshQuery.mutate();
    // }, [width, height, depth, colour, position, rotation]);

    // useImperativeHandle(ref, () => cubeRef.current as THREE.Mesh);
    // const handleDrag = (local: THREE.Matrix4) => {
    //   if (cubeRef.current) {
    //     const position = new THREE.Vector3();
    //     const scale = new THREE.Vector3();
    //     const quaternion = new THREE.Quaternion();
    //     local.decompose(position, quaternion, scale);

    //     cubeRef.current.position.copy(position);
    //     cubeRef.current.scale.copy(scale);

    //     const rotation = new THREE.Euler().setFromQuaternion(quaternion, "XYZ");
    //     cubeRef.current.rotation.copy(rotation);
    //     onPositionChange?.(
    //       [position.x, position.y, position.z],
    //       [rotation.x, rotation.y, rotation.z]
    //     );
    //   }
    // };
    return (
      <PivotControls
        anchor={[0, 0, 0]}
        axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
        hoveredColor={"white"}
        // visible={showPivot}
      >
        <mesh {...props} onClick={onClick} ref={cubeRef}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color={colour} wireframe={wireframe} />
        </mesh>
      </PivotControls>
    );
  };
