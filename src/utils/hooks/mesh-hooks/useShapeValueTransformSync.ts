import { Mesh } from "@/utils/supabase/types/dbTypes";
import { Shape } from "./useShapeValueTransform";
import { useEffect, useRef } from "react";

interface ShapeMap {
  type: { key: "type"; default: "" };
  width: { key: "width"; default: null };
  height: { key: "height"; default: null };
  depth: { key: "depth"; default: null };
  widthSegments: { key: "width_segments"; default: null };
  heightSegments: { key: "height_segments"; default: null };
  depthSegments: { key: "depth_segments"; default: null };
  radius: { key: "radius"; default: null };
  phiStart: { key: "phi_start"; default: null };
  phiLength: { key: "phi_length"; default: null };
  thetaStart: { key: "theta_start"; default: null };
  thetaLength: { key: "theta_length"; default: null };
  radiusTop: { key: "radius_top"; default: null };
  radiusBottom: { key: "radius_bottom"; default: null };
  radialSegments: { key: "radial_segments"; default: null };
  openEnded: { key: "open_ended"; default: null };
  tube: { key: "tube"; default: null };
  tubularSegments: { key: "tubular_segments"; default: null };
  arc: { key: "arc"; default: null };
  p: { key: "p"; default: null };
  q: { key: "q"; default: null };
  capSegments: { key: "cap_segments"; default: null };
  length: { key: "length"; default: null };
}

export const useShapeValueTransformSync = (
  meshData: Partial<Mesh> | null | undefined,
  updateShape: (key: keyof Shape, value: number) => void
) => {
  const previousData = useRef<Partial<Mesh> | null | undefined>(null);
  useEffect(() => {
    const shapeMap: ShapeMap = {
      type: { key: "type", default: "" },
      width: { key: "width", default: null },
      height: { key: "height", default: null },
      depth: { key: "depth", default: null },
      widthSegments: { key: "width_segments", default: null },
      heightSegments: { key: "height_segments", default: null },
      depthSegments: { key: "depth_segments", default: null },
      radius: { key: "radius", default: null },
      phiStart: { key: "phi_start", default: null },
      phiLength: { key: "phi_length", default: null },
      thetaStart: { key: "theta_start", default: null },
      thetaLength: { key: "theta_length", default: null },
      radiusTop: { key: "radius_top", default: null },
      radiusBottom: { key: "radius_bottom", default: null },
      radialSegments: { key: "radial_segments", default: null },
      openEnded: { key: "open_ended", default: null },
      tube: { key: "tube", default: null },
      tubularSegments: { key: "tubular_segments", default: null },
      arc: { key: "arc", default: null },
      p: { key: "p", default: null },
      q: { key: "q", default: null },
      capSegments: { key: "cap_segments", default: null },
      length: { key: "length", default: null },
    };

    if (!meshData || meshData === previousData.current) return;

    Object.entries(shapeMap).forEach(([type, value]) => {
      const key = value.key as keyof Mesh;
      const newValue = meshData[key] ?? null;
      const oldValue = previousData.current?.[key] ?? null;
      if (newValue !== oldValue) {
        updateShape(type as keyof Shape, (meshData[key] as number) ?? 0);
      }
    });

    previousData.current = meshData;
  }, [meshData, updateShape]);
};
