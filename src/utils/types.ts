export interface Geometry {
  type: "cube" | "sphere" | "cylinder" | "plane";
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  colour: string;
}
