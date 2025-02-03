import { Mesh } from "@/utils/supabase/types/dbTypes";
import { useEffect, useRef } from "react";
import { Transform } from "./useTransform";

interface TransformMap {
  position: { key: "pos"; default: 0 };
  rotation: { key: "rot"; default: 0 };
  scale: { key: "scale"; default: 1 };
}

export const useTransformSync = (
  meshData: Partial<Mesh> | null | undefined,
  updateTransform: (
    type: keyof Transform,
    axis: "x" | "y" | "z",
    value: number
  ) => void
) => {
  const previousData = useRef<Partial<Mesh> | null | undefined>(null);

  useEffect(() => {
    const transformMap: TransformMap = {
      position: { key: "pos", default: 0 },
      rotation: { key: "rot", default: 0 },
      scale: { key: "scale", default: 1 },
    };

    if (!meshData || meshData === previousData.current) return;

    Object.entries(transformMap).forEach(([type, config]) => {
      ["x", "y", "z"].forEach((axis) => {
        const key = `${config.key}_${axis}` as keyof Mesh;
        const newValue = meshData[key] ?? config.default;
        const oldValue = previousData.current?.[key] ?? config.default;
        if (newValue !== oldValue) {
          updateTransform(
            type as keyof Transform,
            axis as "x" | "y" | "z",
            meshData[key] ?? config.default
          );
        }
      });
    });
    previousData.current = meshData;
  }, [meshData, updateTransform]);
};
