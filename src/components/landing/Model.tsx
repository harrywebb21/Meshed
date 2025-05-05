"use client";
import { Holofoil } from "@/components/landing/Holofoil";
import { Float, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function MeshedModel() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const { nodes } = useLoader(GLTFLoader, "/meshed.glb");

  useEffect(() => {
    if (nodes && nodes.Cube) {
      setModelLoaded(true);
    }
  }, [nodes]);

  if (!modelLoaded) return null;

  return (
    <Float floatIntensity={5} rotationIntensity={2} scale={1.5}>
      <Holofoil
        geometry={(nodes.Cube as THREE.Mesh).geometry}
        holoIntensityRange={1}
      />
      <mesh geometry={(nodes.Cube as THREE.Mesh).geometry} scale={1.01}>
        <MeshTransmissionMaterial
          color="white"
          roughness={0.2}
          thickness={2}
          distortion={1}
          anisotropicBlur={0.2}
          anisotropyRotation={2}
          transparent
        />
      </mesh>
    </Float>
  );
}

useGLTF.preload("/meshed.glb");
