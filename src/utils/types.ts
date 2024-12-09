export interface Geometry {
  type: "cube" | "sphere" | "cylinder" | "plane";
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  colour: string;
}
