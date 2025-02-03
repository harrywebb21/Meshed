"use client";
import { Mesh, Workspace } from "@/utils/supabase/types/dbTypes";
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

interface WorkspaceValuesMenuProps {
  workspaceData?: Workspace;
  geometries: Mesh[];
  selectedGeometry: Mesh | null;
  returnSelectedGeometry: (geometry: Mesh) => void;
}

export default function WorkspaceValuesMenu({
  workspaceData,
  geometries,
  selectedGeometry,
  returnSelectedGeometry,
}: WorkspaceValuesMenuProps) {
  return (
    <div className=" fixed top-4 left-4 z-10 flex flex-col h-fit p-2  gap-2 shadow-md bg-primary-gray-950 rounded-xl bottom-4 overflow-y-auto">
      <h1 className=" sticky top-0 bg-primary-gray-900 shadow-md p-2 rounded-lg text-lg font-bold capitalize">
        {workspaceData?.workspace_name}
      </h1>
      {geometries.length !== 0 && (
        <div className="flex flex-col  gap-2 overflow-y-auto">
          {geometries.map((geometry) => (
            <button
              key={geometry.id}
              className={` ${
                selectedGeometry?.id === geometry.id
                  ? "border-primary-green"
                  : " border-transparent"
              } bg-primary-gray-900 p-2 rounded-lg shadow-md flex gap-2 items-center capitalize border`}
              onClick={() => {
                returnSelectedGeometry(geometry);
              }}
            >
              {(() => {
                switch (geometry.type) {
                  case "cube":
                    return <TbCube size={12} />;
                  case "sphere":
                    return <TbSphere size={12} />;
                  case "cylinder":
                    return <TbCylinder size={12} />;
                  case "plane":
                    return <TbBorderAll size={12} />;
                  case "torus":
                    return <FaRegCircleDot size={12} />;
                  case "cone":
                    return <TbCone size={12} />;
                  case "capsule":
                    return <TbCapsule size={12} />;
                  case "torusKnot":
                    return <TbCircles size={12} />;
                  default:
                    return null;
                }
              })()}
              {geometry.layer_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
