import { CubeMeshData, SphereMeshData } from "@/utils/types";
import { TbCube, TbSphere } from "react-icons/tb";

interface AddGeometriesMenuProps {
  onCreateGeometry: (newGeometry: CubeMeshData | SphereMeshData) => void;
}

export default function AddGeometriesMenu({
  onCreateGeometry,
}: AddGeometriesMenuProps) {
  const handleCreateCubeGeometry = () => {
    const newGeometry: CubeMeshData = {
      type: "cube",
      width: 1,
      height: 1,
      depth: 1,
    };
    onCreateGeometry(newGeometry);
  };

  const handleCreateSphereGeometry = () => {
    const newGeometry: SphereMeshData = {
      type: "sphere",
      radius: 1,
      widthSegments: 8,
      heightSegments: 6,
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
