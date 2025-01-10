import { PivotControls } from "@react-three/drei";
import { MeshProps, Vector3, Euler } from "@react-three/fiber";
import React from "react";

interface SphereProps extends MeshProps {
  radius: number | null;
  heightSegments: number | null;
  widthSegments: number | null;
  colour: string | null;
  position: Vector3;
  rotation: Euler;
  onClick?: () => void;
  showPivot?: boolean;
  onPositionChange?: (position: Vector3, rotation: Euler) => void;
  wireframe?: boolean | undefined;
  showControls?: boolean;
}

export const Sphere = ({
  radius = 1,
  heightSegments = 32,
  widthSegments = 32,
  colour = "#ffffff",
  wireframe = false,
  onClick,
  showControls = false,
  ...props
}: SphereProps) => {
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
      <mesh {...props} onClick={onClick}>
        <sphereGeometry
          args={[radius ?? 1, widthSegments ?? 32, heightSegments ?? 32]}
        />
        <meshStandardMaterial
          color={colour || undefined}
          wireframe={wireframe}
        />
      </mesh>
    </PivotControls>
  );
};
