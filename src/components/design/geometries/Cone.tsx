import { Mesh } from "@/utils/supabase/types/dbTypes";
import { PivotControls } from "@react-three/drei";
import { MeshProps, Vector3, Euler } from "@react-three/fiber";
import React from "react";

interface ConeProps extends MeshProps {
  data: Mesh;
  onClick?: () => void;
  showPivot?: boolean;
  onPositionChange?: (position: Vector3, rotation: Euler) => void;
  wireframe?: boolean | undefined;
  showControls?: boolean;
}

export const Cone = ({
  data,
  onClick,
  showControls = false,
  ...props
}: ConeProps) => {
  return (
    <PivotControls
      anchor={[0, 0, 0]}
      axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
      hoveredColor={"white"}
      scale={1.5}
      visible={showControls}
      disableAxes={!showControls}
      disableRotations={!showControls}
      disableScaling={!showControls}
      disableSliders={!showControls}
    >
      <mesh
        {...props}
        onClick={onClick}
        scale={[data.scale_x ?? 1, data.scale_y ?? 1, data.scale_z ?? 1]}
        position={[data.pos_x ?? 0, data.pos_y ?? 0, data.pos_z ?? 0]}
        rotation={[data.rot_x ?? 0, data.rot_y ?? 0, data.rot_z ?? 0]}
      >
        <coneGeometry
          args={[
            data.radius ?? 1,
            data.height ?? 1,
            data.radial_segments ?? 8,
            data.height_segments ?? 6,
            data.open_ended ?? false,
            data.theta_start ?? 0,
            data.theta_length ?? Math.PI * 2,
          ]}
        />
        <meshStandardMaterial
          color={data.colour || undefined}
          wireframe={data.wireframe ?? false}
        />
      </mesh>
    </PivotControls>
  );
};
