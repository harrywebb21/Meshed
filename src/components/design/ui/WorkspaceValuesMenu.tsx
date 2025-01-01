"use client";
import { Mesh, Workspace } from "@/utils/supabase/types/dbTypes";
import { TbCube, TbSphere } from "react-icons/tb";

interface WorkspaceValuesMenuProps {
  workspaceData?: Workspace;
  geometries: Mesh[];
  returnSelectedGeometry: (geometry: Mesh) => void;
}

export default function WorkspaceValuesMenu({
  workspaceData,
  geometries,
  returnSelectedGeometry,
}: WorkspaceValuesMenuProps) {
  return (
    <div className=" fixed top-4 left-4 z-10 flex flex-col gap-2 py-2 px-4 shadow-md bg-primary-gray-950 rounded-xl">
      <h1>{workspaceData?.workspace_name}</h1>
      {geometries.map((geometry) => (
        <button
          key={geometry.id}
          className=" bg-primary-gray-900 p-2 rounded-lg shadow-md flex gap-2 items-center capitalize"
          onClick={() => returnSelectedGeometry(geometry)}
        >
          {(() => {
            switch (geometry.type) {
              case "cube":
                return <TbCube size={12} />;
              case "sphere":
                return <TbSphere size={12} />;
              default:
                return null;
            }
          })()}
          {geometry.layer_name}
        </button>
      ))}
    </div>
  );
}
