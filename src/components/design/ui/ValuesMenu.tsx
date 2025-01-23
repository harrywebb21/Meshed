import { useEffect, useState } from "react";
import Input from "./inputs/Input";
import { Mesh } from "@/utils/supabase/types/dbTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMesh } from "@/utils/queries/mesh";
import useTransform from "@/utils/hooks/mesh-hooks/useTransform";
import TransformInputs from "./inputs/TransformInputs";
import { useTransformSync } from "@/utils/hooks/mesh-hooks/useTransformSync";
import ShapeInputs from "./inputs/ShapeInputs";
import MaterialInputs from "./inputs/Materialnputs";
import { useShapeValueTransform } from "@/utils/hooks/mesh-hooks/useShapeValueTransform";
import { useShapeValueTransformSync } from "@/utils/hooks/mesh-hooks/useShapeValueTransformSync";
import { useMaterialTransform } from "@/utils/hooks/mesh-hooks/useMaterialTransform";
import { useMaterialTransformSync } from "@/utils/hooks/mesh-hooks/useMaterialTransformSync";

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

  const { shape, updateShape } = useShapeValueTransform({
    type: meshData?.type || "",
    width: meshData?.width ?? null,
    height: meshData?.height ?? null,
    depth: meshData?.depth ?? null,
    widthSegments: meshData?.width_segments ?? null,
    heightSegments: meshData?.height_segments ?? null,
    depthSegments: meshData?.depth_segments ?? null,
    radius: meshData?.radius ?? null,
    phiStart: meshData?.phi_start ?? null,
    phiLength: meshData?.phi_length ?? null,
    thetaStart: meshData?.theta_start ?? null,
    thetaLength: meshData?.theta_length ?? null,
    radiusTop: meshData?.radius_top ?? null,
    radiusBottom: meshData?.radius_bottom ?? null,
    radialSegments: meshData?.radial_segments ?? null,
    openEnded: meshData?.open_ended ?? null,
    tube: meshData?.tube ?? null,
    tubularSegments: meshData?.tubular_segments ?? null,
    arc: meshData?.arc ?? null,
    p: meshData?.p ?? null,
    q: meshData?.q ?? null,
    capSegments: meshData?.cap_segments ?? null,
    length: meshData?.length ?? null,
  });

  const { material, updateMaterial } = useMaterialTransform({
    colour: meshData?.colour,
    wireframe: meshData?.wireframe,
  });

  useTransformSync(meshData, updateTransform);
  useShapeValueTransformSync(meshData, updateShape);
  useMaterialTransformSync(meshData, updateMaterial);

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
      console.error("Error updating mesh");
    },
  });

  const handleInputMutation = (value: Partial<Mesh>) => {
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
      <ShapeInputs
        shapeData={shape}
        updateShape={(key, value) => {
          updateShape(key, value);
        }}
        handleInputMutation={handleInputMutation}
      />
      <MaterialInputs
        colour={material.colour}
        wireframe={material.wireframe}
        handleInputMutation={handleInputMutation}
        updateMaterial={(type, value) => {
          updateMaterial(type, value);
        }}
      />
    </div>
  );
}
