import { useState } from "react";

export interface Shape {
  type: string;
  width?: number | null;
  height?: number | null;
  depth?: number | null;
  widthSegments?: number | null;
  heightSegments?: number | null;
  depthSegments?: number | null;
  radius?: number | null;
  phiStart?: number | null;
  phiLength?: number | null;
  thetaStart?: number | null;
  thetaLength?: number | null;
  radiusTop?: number | null;
  radiusBottom?: number | null;
  radialSegments?: number | null;
  openEnded?: boolean | null;
  tube?: number | null;
  tubularSegments?: number | null;
  arc?: number | null;
  p?: number | null;
  q?: number | null;
  capSegments?: number | null;
  length?: number | null;
}

export function useShapeValueTransform(initialShape: Partial<Shape>) {
  const [shape, setShape] = useState({
    type: "",
    width: null,
    height: null,
    depth: null,
    widthSegments: null,
    heightSegments: null,
    depthSegments: null,
    radius: null,
    phiStart: null,
    phiLength: null,
    thetaStart: null,
    thetaLength: null,
    radiusTop: null,
    radiusBottom: null,
    radialSegments: null,
    openEnded: null,
    tube: null,
    tubularSegments: null,
    arc: null,
    p: null,
    q: null,
    capSegments: null,
    length: null,
    ...initialShape,
  });

  const updateShape = (type: keyof Partial<Shape>, value: number | boolean) => {
    setShape((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return {
    shape,
    updateShape,
  };
}
