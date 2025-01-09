export interface BaseGeometry {
  pos_x: number;
  pos_y: number;
  pos_z: number;
  rot_x?: number;
  rot_y?: number;
  rot_z?: number;
  scale_x?: number;
  scale_y?: number;
  scale_z?: number;
  colour: string;
  wireframe: boolean;
}

// Plane
export interface PlaneArgs {
  width?: number;
  height?: number;
  widthSegments?: number;
  heightSegments?: number;
}

// Cube
export interface CubeArgs {
  width?: number;
  height?: number;
  depth?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}

// Sphere
export interface SphereArgs {
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  phiStart?: number;
  phiLength?: number;
  thetaStart?: number;
  thetaLength?: number;
}

// Cylinder
export interface CylinderArgs {
  radiusTop?: number;
  radiusBottom?: number;
  height?: number;
  radialSegments?: number;
  heightSegments?: number;
  openEnded?: boolean;
  thetaStart?: number;
  thetaLength?: number;
}

// Torus
export interface TorusArgs {
  radius?: number;
  tube?: number;
  radialSegments?: number;
  tubularSegments?: number;
  arc?: number;
}

// Cone
export interface ConeArgs {
  radius?: number;
  height?: number;
  radialSegments?: number;
  heightSegments?: number;
  openEnded?: boolean;
  thetaStart?: number;
  thetaLength?: number;
}

// Capsule
export interface CapsuleArgs {
  radius?: number;
  length?: number;
  capSegments?: number;
  radialSegments?: number;
}

// Ring
export interface RingArgs {
  innerRadius?: number;
  outerRadius?: number;
  thetaSegments?: number;
  phiSegments?: number;
  thetaStart?: number;
  thetaLength?: number;
}

// Torus Knot
export interface TorusKnotArgs {
  radius?: number;
  tube?: number;
  tubularSegments?: number;
  radialSegments?: number;
  p?: number;
  q?: number;
}

export interface PlaneGeometry extends BaseGeometry, PlaneArgs {
  type: "plane";
}

export interface CubeGeometry extends BaseGeometry, CubeArgs {
  type: "cube";
}

export interface SphereGeometry extends BaseGeometry, SphereArgs {
  type: "sphere";
}

export interface CylinderGeometry extends BaseGeometry, CylinderArgs {
  type: "cylinder";
}

export interface TorusGeometry extends BaseGeometry, TorusArgs {
  type: "torus";
}

export interface ConeGeometry extends BaseGeometry, ConeArgs {
  type: "cone";
}

export interface CapsuleGeometry extends BaseGeometry, CapsuleArgs {
  type: "capsule";
}

export interface RingGeometry extends BaseGeometry, RingArgs {
  type: "ring";
}

export interface TorusKnotGeometry extends BaseGeometry, TorusKnotArgs {
  type: "torusKnot";
}
