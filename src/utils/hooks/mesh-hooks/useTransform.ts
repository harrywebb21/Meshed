import { useState } from "react";

export interface Transform {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

export default function useTransform(initialTransform: Partial<Transform>) {
  const [transform, setTransform] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    ...initialTransform,
  });

  const updateTransform = (
    type: keyof Transform,
    axis: "x" | "y" | "z",
    value: number
  ) => {
    setTransform((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [axis]: value,
      },
    }));
  };

  return { transform, updateTransform };
}
