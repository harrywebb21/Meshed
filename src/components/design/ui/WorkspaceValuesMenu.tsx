"use client";
import { Mesh, Workspace } from "@/utils/supabase/types/dbTypes";
import { useRouter } from "next/navigation";
import { FaRegCircleDot } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import {
  TbBorderAll,
  TbCapsule,
  TbCircles,
  TbCone,
  TbCube,
  TbCylinder,
  TbSphere,
} from "react-icons/tb";
import PresenceIndicators from "./PresenceIndicators";
import Logo from "@/components/Logo";
import ShareButton from "./ShareButton";
import ShareModal from "./ShareModal";
import { useState } from "react";

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
  const router = useRouter();
  const handleDashboardRedirect = () => {
    router.push("/dashboard");
  };
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  return (
    <>
      {isShareModalOpen && (
        <ShareModal onclick={() => setIsShareModalOpen(false)} />
      )}
      <div className=" fixed top-4 left-4 bottom-4 z-10 flex flex-col p-2 gap-2 shadow-md bg-primary-gray-950 rounded-xl min-w-64">
        <div className="sticky top-0bg-primary-gray-900 shadow-md p-2 rounded-lg flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <button onClick={handleDashboardRedirect}>
              <IoArrowBack size={16} className=" hover:text-primary-green" />
            </button>
            <h1 className="text-md font-bold ">
              {workspaceData?.workspace_name}
            </h1>
          </div>
          <ShareButton
            onclick={() => {
              setIsShareModalOpen(true);
            }}
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          {geometries.length !== 0 && (
            <div className="flex flex-col pr-2 gap-2 overflow-y-auto">
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
                  <p className="text-sm">{geometry.layer_name}</p>
                </button>
              ))}
            </div>
          )}
          <div className=" h-fit flex items-center justify-center w-full gap-2">
            <Logo className="w-12" green />
            <PresenceIndicators workspaceId={workspaceData?.id} />
          </div>
        </div>
      </div>
    </>
  );
}
