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

export interface CubeMeshData {
  type: "cube";
  width: number;
  height: number;
  depth: number;
}

export interface SphereMeshData {
  type: "sphere";
  radius: number;
  widthSegments: number;
  heightSegments: number;
}

export interface MeshData {
  id: string;
  created_at: string;
  mesh_data: CubeMeshData | SphereMeshData;
  workspace_id: string;
  created_by: string;
}
