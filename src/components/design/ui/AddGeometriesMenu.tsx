import { CubeGeometry, SphereGeometry } from "@/utils/types";
import { TbCube, TbSphere } from "react-icons/tb";

interface AddGeometriesMenuProps {
  onCreateGeometry: (newGeometry: CubeGeometry | SphereGeometry) => void;
}

export default function AddGeometriesMenu({
  onCreateGeometry,
}: AddGeometriesMenuProps) {
  const handleCreateCubeGeometry = () => {
    const newGeometry: CubeGeometry = {
      type: "cube",
      width: 1,
      height: 1,
      depth: 1,
      pos_x: 0,
      pos_y: 0,
      pos_z: 0,
      rot_x: 0,
      rot_y: 0,
      rot_z: 0,
      scale_x: 1,
      scale_y: 1,
      scale_z: 1,
      colour: "#ffffff",
      wireframe: false,
    };
    onCreateGeometry(newGeometry);
  };

  const handleCreateSphereGeometry = () => {
    const newGeometry: SphereGeometry = {
      type: "sphere",
      radius: 1,
      widthSegments: 32,
      heightSegments: 32,
      pos_x: 0,
      pos_y: 0,
      pos_z: 0,
      rot_x: 0,
      rot_y: 0,
      rot_z: 0,
      scale_x: 1,
      scale_y: 1,
      scale_z: 1,
      colour: "#ffffff",
      wireframe: false,
    };
    onCreateGeometry(newGeometry);
  };

  return (
    <div className=" fixed top-4 -translate-x-1/2 left-1/2 z-10 flex  gap-2 p-2 shadow-md bg-primary-gray-950 rounded-xl w-fit">
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm"
        onClick={handleCreateCubeGeometry}
      >
        <TbCube />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm"
        onClick={handleCreateSphereGeometry}
      >
        <TbSphere />
      </button>
    </div>
  );
}
