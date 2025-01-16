import { useEffect, useState } from "react";
import Input from "./inputs/Input";
import { Mesh } from "@/utils/supabase/types/dbTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMesh } from "@/utils/queries/mesh";
import useTransform from "@/utils/hooks/mesh-hooks/useTransform";
import TransformInputs from "./inputs/TransformInputs";

interface ValuesMenuProps {
  meshData?: Mesh | null;
  workspaceId: string;
}

export default function ValuesMenu({ meshData, workspaceId }: ValuesMenuProps) {
  const { transform, updateTransform } = useTransform({
    position: {
      x: meshData?.pos_x || 0,
      y: meshData?.pos_y || 0,
      z: meshData?.pos_z || 0,
    },
    rotation: {
      x: meshData?.rot_x || 0,
      y: meshData?.rot_y || 0,
      z: meshData?.rot_z || 0,
    },
    scale: {
      x: meshData?.scale_x || 1,
      y: meshData?.scale_y || 1,
      z: meshData?.scale_z || 1,
    },
  });

  //SHAPES
  const [width, setWidth] = useState<number>(meshData?.width || 1);
  const [height, setHeight] = useState<number>(meshData?.height || 1);
  const [depth, setDepth] = useState<number>(meshData?.depth || 1);
  const [widthSegments, setWidthSegments] = useState<number>(
    meshData?.width_segments || 1
  );
  const [heightSegments, setHeightSegments] = useState<number>(
    meshData?.height_segments || 1
  );
  const [depthSegments, setDepthSegments] = useState<number>(
    meshData?.depth_segments || 1
  );

  //MATERIALS
  const [colour, setColour] = useState<string>(meshData?.colour || "");
  const [wireframe, setWireframe] = useState<boolean>(
    meshData?.wireframe || false
  );

  useEffect(() => {
    setWidth(meshData?.width || 1);
    setHeight(meshData?.height || 1);
    setDepth(meshData?.depth || 1);
    setColour(meshData?.colour || "");
    setWireframe(meshData?.wireframe || false);
  }, [meshData]);

  const queryClient = useQueryClient();

  const meshUpdateQuery = useMutation({
    mutationFn: async (newMeshData: Partial<Mesh>) => {
      await updateMesh(meshData!.id, newMeshData);
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

  /*TODO: Fix this useEffect as it is mutating the mesh data everytime we select a new mesh because 
  meshData changes and updates the states which then triggers the mutation to happen. THIS SHOULD NOT HAPPEN!!!
  
  - add all of the types of inputs depending on the type of mesh selected
  */

  const handleInputMutation = (value: Partial<Mesh>) => {
    if (
      Object.keys(value).length === 0 ||
      Object.values(value).filter((v) => v === Number.isNaN(v)).length > 0
    ) {
      return;
    }
    meshUpdateQuery.mutate({
      ...value,
    });
  };

  return (
    <div className=" fixed top-4 right-4 z-10 flex flex-col gap-2 p-2 shadow-md bg-primary-gray-950 rounded-xl">
      <h1 className="text-xl font-bold bg-primary-gray-900 p-2 rounded-lg shadow-md capitalize">
        {meshData?.layer_name}
      </h1>
      <TransformInputs
        pos_x={transform.position.x}
        pos_y={transform.position.y}
        pos_z={transform.position.z}
        rot_x={transform.rotation.x}
        rot_y={transform.rotation.y}
        rot_z={transform.rotation.z}
        scale_x={transform.scale.x}
        scale_y={transform.scale.y}
        scale_z={transform.scale.z}
        updateTransform={(type, axis, value) =>
          updateTransform(type, axis, value)
        }
        handleInputMutation={handleInputMutation}
      />

      <div className="  bg-primary-gray-900 rounded-lg shadow-md flex flex-col">
        <h1 className=" text-sm  bg-neutral-800 w-full p-2 rounded-lg shadow-md">
          Shape
        </h1>
        <div className="p-2">
          {meshData?.type === "cube" && (
            <div className="flex flex-col max-w-56 gap-2">
              <h1 className=" text-sm text-neutral-600">Size</h1>
              <div className="flex w-full items-center gap-2">
                <Input
                  label="H"
                  value={height}
                  type="number"
                  returnValue={(value) => handleChange(value, setHeight)}
                  onChange={(e) => {
                    handleChange(e.target.value, setHeight);
                    handleInputMutation({ height: Number(e.target.value) });
                  }}
                />
                <Input
                  label="W"
                  value={width}
                  type="number"
                  returnValue={(value) => handleChange(value, setWidth)}
                  onChange={(e) => {
                    handleChange(e.target.value, setWidth);
                    handleInputMutation({ width: Number(e.target.value) });
                  }}
                />
                <Input
                  label="D"
                  value={depth}
                  type="number"
                  returnValue={(value) => handleChange(value, setDepth)}
                  onChange={(e) => {
                    handleChange(e.target.value, setDepth);
                    handleInputMutation({ depth: Number(e.target.value) });
                  }}
                />
              </div>
              <h1 className=" text-sm text-neutral-600">Side Segments</h1>
              <div className="flex w-full items-center gap-2">
                <Input
                  label="W"
                  value={widthSegments}
                  type="number"
                  returnValue={(value) => handleChange(value, setWidthSegments)}
                  onChange={(e) => {
                    handleChange(e.target.value, setWidthSegments);
                    handleInputMutation({
                      width_segments: Number(e.target.value),
                    });
                  }}
                />

                <Input
                  label="H"
                  value={heightSegments}
                  type="number"
                  returnValue={(value) =>
                    handleChange(value, setHeightSegments)
                  }
                  onChange={(e) => {
                    handleChange(e.target.value, setHeightSegments);
                    handleInputMutation({
                      height_segments: Number(e.target.value),
                    });
                  }}
                />
                <Input
                  label="D"
                  value={depthSegments}
                  type="number"
                  returnValue={(value) => handleChange(value, setDepthSegments)}
                  onChange={(e) => {
                    handleChange(e.target.value, setDepthSegments);
                    handleInputMutation({
                      depth_segments: Number(e.target.value),
                    });
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" p-2 bg-primary-gray-900 rounded-lg shadow-md flex flex-col gap-2">
        <h1 className=" text-sm text-neutral-600">Colour</h1>
        <Input
          label="Colour"
          value={colour}
          type="color"
          returnValue={(value) => handleChange(value, setColour)}
          onChange={(e) => {
            handleChange(e.target.value, setColour);
            handleInputMutation({ colour: e.target.value });
          }}
        />
        <Input
          label="Wireframe"
          value={wireframe}
          type="select"
          returnValue={(value) => handleChange(value, setWireframe)}
          onChange={(e) => {
            handleChange(e.target.value, setWireframe);
            handleInputMutation({
              wireframe: e.target.value === "true" ? true : false,
            });
          }}
        />
      </div>
    </div>
  );
}
