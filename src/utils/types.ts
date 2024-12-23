import { Euler, Vector3 } from "@react-three/fiber";

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

export interface CubeMesh {
  type: "cube";
  width: number;
  height: number;
  depth: number;
  colour: string;
  position: Vector3;
  rotation: Euler;
}
