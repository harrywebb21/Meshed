//Author: Harry Webb
//Description: This is a custom shader material that creates a holofoil effect on a 3D object.
//Github: github.com/harrywebb21
//X: x.com/harry_webb98
//Personal Website: harrywebb.com

//HOW TO USE:
//1. Import the Holofoil component into your project
//2. Wrap the Holofoil component around a 3D object or pass it a geometry prop
//3. Adjust the props to your liking
//4. Enjoy your holofoil effect!

//## please note if you pass a geometry as a prop but place a geeometry as a child. it will favour the child. ##

//PROPS:
//children: React.ReactNode
//geometry: THREE.BufferGeometry
//holoOpacity: number
//holoIntensityRange: number
//holoSaturation: number
//holobrightness: number
//holoTime: number

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { ReactThreeFiber } from "@react-three/fiber";

declare module "three" {
  interface ShaderMaterial {
    time: number;
  }
}
declare module "@react-three/fiber" {
  interface ThreeElements {
    holoShader: ReactThreeFiber.Object3DNode<
      THREE.ShaderMaterial,
      typeof THREE.ShaderMaterial
    >;
  }
}

export function Holofoil({
  children,
  geometry,
  holoOpacity,
  holoIntensityRange,
  holoSaturation,
  holobrightness,
  holoTime,
  ...props
}: {
  children?: React.ReactNode;
  geometry?: THREE.BufferGeometry;
  holoOpacity?: number;
  holoIntensityRange?: number;
  holoSaturation?: number;
  holobrightness?: number;
  holoTime?: number;
} & JSX.IntrinsicElements["mesh"]) {
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
   `;

  const fragmentShader = `
    uniform float time;
    uniform float opacity;
    uniform float intensityRange;
    uniform float saturation;
    uniform float brightness;
    varying vec3 vNormal;
    varying vec3 vPosition;

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.rrr + K.rgb) * 6.0 - K.www);
      return c.b * mix(K.rrr, clamp(p - K.rrr, 0.0, 1.0), c.g);
    }

    vec3 holofoilColors(float intensity) {
      // Map intensity to a hue value between 0 and 1
      float hue = fract(intensity * intensityRange);
      return hsv2rgb(vec3(hue, saturation, brightness)); 
    }

    void main() {
      float intensity = dot(normalize(vNormal), normalize(vPosition));
      vec3 color = holofoilColors(intensity);
      gl_FragColor = vec4(color, opacity);
    }
    `;

  const HoloShader = shaderMaterial(
    {
      time: holoTime ?? 2,
      opacity: holoOpacity ?? 1, //how transparent the colours are
      intensityRange: holoIntensityRange ?? 2, //how many colours you want to cycle through (5 is intense any higher and it will be too much depending on the saturation and brightness)
      saturation: holoSaturation ?? 0.85, //only goes up to 1 it can go higher but it will make all the colours blocky (0.85 is the best)
      brightness: holobrightness ?? 0.5, //same as saturation (0.5 is the best)
    },
    vertexShader,
    fragmentShader
  );
  extend({ HoloShader });

  const boxMatRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state) => {
    if (boxMatRef.current) {
      boxMatRef.current.time = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry} {...props} position={[0, 0, 0]}>
      {children}
      <holoShader
        ref={boxMatRef}
        attach={"material"}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}
