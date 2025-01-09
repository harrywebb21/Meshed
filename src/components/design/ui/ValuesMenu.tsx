import { useEffect, useState } from "react";
import Input from "./inputs/Input";
import { Mesh } from "@/utils/supabase/types/dbTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMesh } from "@/utils/queries/mesh";

interface ValuesMenuProps {
  meshData?: Mesh | null;
  workspaceId: string;
}

export default function ValuesMenu({ meshData, workspaceId }: ValuesMenuProps) {
  const [positionX, setPositionX] = useState<number>(meshData?.pos_x || 0);
  const [positionY, setPositionY] = useState<number>(meshData?.pos_y || 0);
  const [positionZ, setPositionZ] = useState<number>(meshData?.pos_z || 0);
  const [rotationX, setRotationX] = useState<number>(meshData?.rot_x || 0);
  const [rotationY, setRotationY] = useState<number>(meshData?.rot_y || 0);
  const [rotationZ, setRotationZ] = useState<number>(meshData?.rot_z || 0);
  const [scaleX, setScaleX] = useState<number>(meshData?.scale_x || 1);
  const [scaleY, setScaleY] = useState<number>(meshData?.scale_y || 1);
  const [scaleZ, setScaleZ] = useState<number>(meshData?.scale_z || 1);
  const [colour, setColour] = useState<string>(meshData?.colour || "");
  const [wireframe, setWireframe] = useState<boolean>(
    meshData?.wireframe || false
  );

  const queryClient = useQueryClient();

  const meshUpdateQuery = useMutation({
    mutationFn: async (newMeshData: Partial<Mesh>) => {
      await updateMesh(
        meshData!.id,
        newMeshData.pos_x,
        newMeshData.pos_y,
        newMeshData.pos_z,
        newMeshData.rot_x,
        newMeshData.rot_y,
        newMeshData.rot_z,
        newMeshData.colour,
        newMeshData.scale_x,
        newMeshData.scale_y,
        newMeshData.scale_z,
        newMeshData.wireframe
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meshes", workspaceId],
      });
    },
    onError: (error) => {
      console.error("Error updating mesh:", error);
    },
  });

  const handleChange = <T,>(
    value: string | number | boolean,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    setState(value as T);
  };

  useEffect(() => {
    if (meshData) {
      setPositionX(meshData?.pos_x ?? 0);
      setPositionY(meshData?.pos_y ?? 0);
      setPositionZ(meshData?.pos_z ?? 0);
      setRotationX(meshData?.rot_x ?? 0);
      setRotationY(meshData?.rot_y ?? 0);
      setRotationZ(meshData?.rot_z ?? 0);
      setColour(meshData?.colour ?? "");
      setWireframe(meshData?.wireframe ?? false);
      setScaleX(meshData?.scale_x ?? 1);
      setScaleY(meshData?.scale_y ?? 1);
      setScaleZ(meshData?.scale_z ?? 1);
    }
  }, [meshData]);
  useEffect(() => {
    if (
      positionX.toString() === "" ||
      positionY.toString() === "" ||
      positionZ.toString() === "" ||
      rotationX.toString() === "" ||
      rotationY.toString() === "" ||
      rotationZ.toString() === "" ||
      scaleX.toString() === "" ||
      scaleY.toString() === "" ||
      scaleZ.toString() === "" ||
      colour === "" ||
      wireframe.toString() === ""
    ) {
      return;
    }

    meshUpdateQuery.mutate({
      pos_x: positionX,
      pos_y: positionY,
      pos_z: positionZ,
      rot_x: rotationX,
      rot_y: rotationY,
      rot_z: rotationZ,
      scale_x: scaleX,
      scale_y: scaleY,
      scale_z: scaleZ,
      colour: colour,
      wireframe: wireframe,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    scaleX,
    scaleY,
    scaleZ,
    colour,
    wireframe,
  ]);

  return (
    <div className=" fixed top-4 right-4 z-10 flex flex-col gap-2 p-2 shadow-md bg-primary-gray-950 rounded-xl">
      <h1 className="text-xl font-bold bg-primary-gray-900 p-2 rounded-lg shadow-md capitalize">
        {meshData?.layer_name}
      </h1>
      <div className=" p-2 bg-primary-gray-900 rounded-lg shadow-md flex flex-col gap-2">
        <h2 className=" text-sm text-neutral-500">Position</h2>
        <div className="flex max-w-56 gap-2">
          <Input
            label="X"
            value={positionX}
            type="number"
            returnValue={(value) => handleChange(value, setPositionX)}
            onChange={(e) => handleChange(e.target.value, setPositionX)}
          />
          <Input
            label="Y"
            value={positionY}
            type="number"
            returnValue={(value) => handleChange(value, setPositionY)}
            onChange={(e) => handleChange(e.target.value, setPositionY)}
          />
          <Input
            label="Z"
            value={positionZ}
            type="number"
            returnValue={(value) => handleChange(value, setPositionZ)}
            onChange={(e) => handleChange(e.target.value, setPositionZ)}
          />
        </div>
      </div>
      <div className=" p-2 bg-primary-gray-900 rounded-lg shadow-md flex flex-col gap-2">
        <h1 className=" text-sm text-neutral-600">Rotation</h1>
        <div className="flex max-w-56 gap-2">
          <Input
            label="X"
            value={rotationX}
            type="number"
            returnValue={(value) => handleChange(value, setRotationX)}
            onChange={(e) => handleChange(e.target.value, setRotationX)}
          />
          <Input
            label="Y"
            value={rotationY}
            type="number"
            returnValue={(value) => handleChange(value, setRotationY)}
            onChange={(e) => handleChange(e.target.value, setRotationY)}
          />
          <Input
            label="Z"
            value={rotationZ}
            type="number"
            returnValue={(value) => handleChange(value, setRotationZ)}
            onChange={(e) => handleChange(e.target.value, setRotationZ)}
          />
        </div>
      </div>
      <div className=" p-2 bg-primary-gray-900 rounded-lg shadow-md flex flex-col gap-2">
        <h1 className=" text-sm text-neutral-600">Scale</h1>
        <div className="flex max-w-56 gap-2">
          <Input
            label="X"
            value={scaleX}
            type="number"
            returnValue={(value) => handleChange(value, setScaleX)}
            onChange={(e) => handleChange(e.target.value, setScaleX)}
          />
          <Input
            label="Y"
            value={scaleY}
            type="number"
            returnValue={(value) => handleChange(value, setScaleY)}
            onChange={(e) => handleChange(e.target.value, setScaleY)}
          />
          <Input
            label="Z"
            value={scaleZ}
            type="number"
            returnValue={(value) => handleChange(value, setScaleZ)}
            onChange={(e) => handleChange(e.target.value, setScaleZ)}
          />
        </div>
      </div>

      <div className=" p-2 bg-primary-gray-900 rounded-lg shadow-md flex flex-col gap-2">
        <h1 className=" text-sm text-neutral-600">Colour</h1>
        <Input
          label="Colour"
          value={colour}
          type="color"
          returnValue={(value) => handleChange(value, setColour)}
          onChange={(e) => handleChange(e.target.value, setColour)}
        />
        <Input
          label="Wireframe"
          value={wireframe}
          type="select"
          returnValue={(value) => handleChange(value, setWireframe)}
          onChange={(e) => handleChange(e.target.value, setWireframe)}
        />
      </div>
    </div>
  );
}
