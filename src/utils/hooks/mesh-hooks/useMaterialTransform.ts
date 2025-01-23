import { useState } from "react";

export interface Material {
  colour: string | null;
  wireframe: boolean | null;
}

export const useMaterialTransform = (initialMaterial: Partial<Material>) => {
  const [material, setMaterial] = useState<Material>({
    colour: "#ffffff",
    wireframe: false,
    ...initialMaterial,
  });

  const updateMaterial = (type: keyof Material, value: string | boolean) => {
    setMaterial((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return { material, updateMaterial };
};
