"use client";
import { getWorkspaceById } from "@/utils/queries/workspace";
import { useQuery } from "@tanstack/react-query";
import { Workspace } from "@/utils/supabase/types/dbTypes";
import { useEffect, useRef, useState } from "react";
import Cube from "@/components/design/geometries/Cube";
import { Geometry } from "@/utils/types";
import WorkspaceScene from "@/components/design/WorkspaceScene";
import * as THREE from "three";

export default function WorkspacePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = params;

  const [geometries, setGeometries] = useState<Geometry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const xInputRef = useRef<HTMLInputElement>(null);
  const yInputRef = useRef<HTMLInputElement>(null);
  const zInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const depthInputRef = useRef<HTMLInputElement>(null);
  const colourInputRef = useRef<HTMLInputElement>(null);

  const geometryRef = useRef<(THREE.Mesh | null)[]>([]);

  const { data: workspaceData } = useQuery<Workspace>({
    queryKey: ["workspace", id],
    queryFn: async () => getWorkspaceById(id),
    enabled: !!id,
  });

  console.log(workspaceData);

  useEffect(() => {
    console.log(geometries);
  }, [geometries]);

  const handleCreateCubeGeometry = (type: Geometry["type"]) => {
    const newGeometry: Geometry = {
      type,
      x: 0,
      y: 0,
      z: 0,
      width: 1,
      height: 1,
      depth: 1,
      colour: "#ffffff",
    };
    setGeometries((prevGeometries) => [...prevGeometries, newGeometry]);
    setSelectedIndex(geometries.length);
    if (xInputRef.current) xInputRef.current.value = "0";
    if (yInputRef.current) yInputRef.current.value = "0";
    if (zInputRef.current) zInputRef.current.value = "0";
    if (widthInputRef.current) widthInputRef.current.value = "1";
    if (heightInputRef.current) heightInputRef.current.value = "1";
    if (depthInputRef.current) depthInputRef.current.value = "1";
    if (colourInputRef.current) colourInputRef.current.value = "#ffffff";
  };

  const handleInputChange = (field: keyof Geometry, value: string) => {
    if (selectedIndex !== null) {
      setGeometries((prevGeometries) =>
        prevGeometries.map((geometry, i) =>
          i === selectedIndex
            ? {
                ...geometry,
                [field]: field === "colour" ? value : parseFloat(value),
              }
            : geometry
        )
      );
    }
  };

  const updateInputValues = (geometry: Geometry) => {
    if (xInputRef.current) xInputRef.current.value = geometry.x.toString();
    if (yInputRef.current) yInputRef.current.value = geometry.y.toString();
    if (zInputRef.current) zInputRef.current.value = geometry.z.toString();
    if (widthInputRef.current)
      widthInputRef.current.value = geometry.width.toString();
    if (heightInputRef.current)
      heightInputRef.current.value = geometry.height.toString();
    if (depthInputRef.current)
      depthInputRef.current.value = geometry.depth.toString();
    if (colourInputRef.current) colourInputRef.current.value = geometry.colour;
  };

  const handleSelectGeometry = (index: number) => {
    setSelectedIndex(index);
    const selectedGeometry = geometries[index];
    updateInputValues(selectedGeometry);
  };

  const handlePositionChange = (
    index: number,
    position: [number, number, number]
  ) => {
    setGeometries((prevGeometries) =>
      prevGeometries.map((geometry, i) =>
        i === index
          ? {
              ...geometry,
              x: position[0],
              y: position[1],
              z: position[2],
            }
          : geometry
      )
    );
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-10 flex flex-col gap-2 p-4 border border-white/20 bg-primary-gray-950 rounded-xl">
        <input
          type="text"
          placeholder="x"
          name="xInput"
          onChange={(e) => handleInputChange("x", e.target.value)}
          ref={xInputRef}
        />
        <input
          type="text"
          placeholder="y"
          name="yInput"
          onChange={(e) => handleInputChange("y", e.target.value)}
          ref={yInputRef}
        />
        <input
          type="text"
          placeholder="z"
          name="zInput"
          onChange={(e) => handleInputChange("z", e.target.value)}
          ref={zInputRef}
        />
        <input
          type="text"
          placeholder="width"
          name="widthInput"
          onChange={(e) => handleInputChange("width", e.target.value)}
          ref={widthInputRef}
        />
        <input
          type="text"
          placeholder="height"
          name="heightInput"
          onChange={(e) => handleInputChange("height", e.target.value)}
          ref={heightInputRef}
        />
        <input
          type="text"
          placeholder="depth"
          name="depthInput"
          onChange={(e) => handleInputChange("depth", e.target.value)}
          ref={depthInputRef}
        />
        <input
          type="color"
          name="colourInput"
          onChange={(e) => handleInputChange("colour", e.target.value)}
          ref={colourInputRef}
        />
        <button
          onClick={() => handleCreateCubeGeometry("cube")}
          className=" bg-green-500"
        >
          Cube Geometry
        </button>
      </div>

      <div className="w-full h-svh">
        <WorkspaceScene>
          {geometries.map((geometry, index) => {
            switch (geometry.type) {
              case "cube":
                return (
                  <Cube
                    key={index}
                    ref={(mesh) => (geometryRef.current[index] = mesh)}
                    showPivot={selectedIndex === index}
                    onClick={() => handleSelectGeometry(index)}
                    position={[geometry.x, geometry.y, geometry.z]}
                    width={geometry.width}
                    height={geometry.height}
                    depth={geometry.depth}
                    colour={geometry.colour}
                    onPositionChange={(position) =>
                      handlePositionChange(index, position)
                    }
                  />
                );
              default:
                return null;
            }
          })}
        </WorkspaceScene>
      </div>
    </>
  );
}
