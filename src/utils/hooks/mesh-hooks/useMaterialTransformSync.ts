import { Mesh } from "@/utils/supabase/types/dbTypes";
import { Material } from "./useMaterialTransform";
import { useEffect, useRef } from "react";

interface MaterialMap {
  colour: { key: "colour"; default: "#ffffff" };
  wireframe: { key: "wireframe"; default: false };
}

export const useMaterialTransformSync = (
  meshData: Partial<Mesh> | null | undefined,
  updateMaterial: (type: keyof Material, value: string | boolean) => void
) => {
  const previousData = useRef<Partial<Mesh> | null | undefined>(null);
  useEffect(() => {
    const materialMap: MaterialMap = {
      colour: { key: "colour", default: "#ffffff" },
      wireframe: { key: "wireframe", default: false },
    };

    if (!meshData || meshData === previousData.current) return;

    Object.entries(materialMap).forEach(([type, value]) => {
      const key = value.key as keyof Mesh;
      const newValue = meshData[key] ?? null;
      const oldValue = previousData.current?.[key] ?? null;
      if (newValue !== oldValue) {
        updateMaterial(type as keyof Material, meshData[key] ?? value.default);
      }
    });
    previousData.current = meshData;
  }, [meshData, updateMaterial]);
};
