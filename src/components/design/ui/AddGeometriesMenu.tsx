import { CubeMesh } from "@/utils/types";
import { TbCube } from "react-icons/tb";

interface AddGeometriesMenuProps {
  onCreateGeometry: (newGeometry: CubeMesh) => void;
}

export default function AddGeometriesMenu({
  onCreateGeometry,
}: AddGeometriesMenuProps) {
  const handleCreateCubeGeometry = () => {
    const newGeometry: CubeMesh = {
      type: "cube",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      width: 1,
      height: 1,
      depth: 1,
      colour: "#ffffff",
      wireframe: false,
    };
    onCreateGeometry(newGeometry);
  };

  return (
    <div className=" fixed top-4 -translate-x-1/2 left-1/2 z-10 flex flex-col gap-2 p-2 shadow-md bg-primary-gray-950 rounded-xl w-fit">
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm"
        onClick={handleCreateCubeGeometry}
      >
        <TbCube />
      </button>
    </div>
  );
}
