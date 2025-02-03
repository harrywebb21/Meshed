import {
  CapsuleGeometry,
  ConeGeometry,
  CubeGeometry,
  CylinderGeometry,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
} from "@/utils/types";
import { FaRegCircleDot } from "react-icons/fa6";
import {
  TbBorderAll,
  TbCapsule,
  TbCircles,
  TbCone,
  TbCube,
  TbCylinder,
  TbSphere,
} from "react-icons/tb";

interface AddGeometriesMenuProps {
  onCreateGeometry: (
    newGeometry:
      | CubeGeometry
      | SphereGeometry
      | CylinderGeometry
      | PlaneGeometry
      | TorusGeometry
      | ConeGeometry
      | CapsuleGeometry
      | TorusKnotGeometry
  ) => void;
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

  const handleCreateCylinderGeometry = () => {
    const newGeometry: CylinderGeometry = {
      type: "cylinder",
      radiusTop: 1,
      radiusBottom: 1,
      height: 1,
      radialSegments: 32,
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

  const handleCreatePlaneGeometry = () => {
    const newGeometry: PlaneGeometry = {
      type: "plane",
      width: 1,
      height: 1,
      widthSegments: 1,
      heightSegments: 1,
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

  const handleCreateTorusGeometry = () => {
    const newGeometry: TorusGeometry = {
      type: "torus",
      radius: 1,
      tube: 0.4,
      radialSegments: 8,
      tubularSegments: 6,
      arc: Math.PI * 2,
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

  const handleCreateConeGeometry = () => {
    const newGeometry: ConeGeometry = {
      type: "cone",
      radius: 1,
      height: 1,
      radialSegments: 8,
      heightSegments: 6,
      openEnded: false,
      thetaStart: 0,
      thetaLength: Math.PI * 2,
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

  const handleCreateCapsuleGeometry = () => {
    const newGeometry: CapsuleGeometry = {
      type: "capsule",
      radius: 1,
      length: 1,
      radialSegments: 8,
      capSegments: 6,
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

  const handleCreateTorusKnotGeometry = () => {
    const newGeometry: TorusKnotGeometry = {
      type: "torusKnot",
      radius: 1,
      tube: 0.4,
      tubularSegments: 8,
      radialSegments: 6,
      p: 2,
      q: 3,
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
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreateCubeGeometry}
      >
        <TbCube />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreateSphereGeometry}
      >
        <TbSphere />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreateCylinderGeometry}
      >
        <TbCylinder />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreatePlaneGeometry}
      >
        <TbBorderAll />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreateTorusGeometry}
      >
        <FaRegCircleDot />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreateConeGeometry}
      >
        <TbCone />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreateCapsuleGeometry}
      >
        <TbCapsule />
      </button>
      <button
        className="flex items-center gap-2 p-2 bg-primary-gray-900 rounded-md w-fit relative shadow-sm border border-transparent hover:border-primary-green"
        onClick={handleCreateTorusKnotGeometry}
      >
        <TbCircles />
      </button>
    </div>
  );
}
