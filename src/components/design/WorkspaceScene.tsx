"use client";
import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useAtomValue, useSetAtom } from "jotai";
import { exportModeAtom, sceneAtom } from "@/utils/jotai-atoms/sceneAtom";

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(5, 1, 5);
    (camera as THREE.PerspectiveCamera).fov = 25;
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function SceneSetup() {
  const { scene } = useThree();
  const setScene = useSetAtom(sceneAtom);
  useEffect(() => {
    setScene(scene);
  }, [scene]);

  return null;
}

export function useScreenshot() {
  const { gl, scene, camera } = useThree();

  const refs = useRef({ gl, scene, camera });

  useEffect(() => {
    refs.current = { gl, scene, camera };
  }, [gl, scene, camera]);

  const takeScreenshot = useCallback(
    (options = { width: 1920, height: 1080 }) => {
      const { gl, scene, camera } = refs.current;
      const originalSize = gl.getSize(new THREE.Vector2());
      const originalRenderTarget = gl.getRenderTarget();

      gl.setSize(options.width, options.height, false);

      scene.traverse((object) => {
        if (object.visible === false) {
        }
      });

      gl.clear();
      gl.render(scene, camera);
      const dataUrl = gl.domElement.toDataURL("image/png");

      gl.setRenderTarget(originalRenderTarget);
      gl.setSize(originalSize.x, originalSize.y, false);

      return dataUrl;
    },
    []
  );
  return takeScreenshot;
}

function SceneCapture({
  onCapture,
}: {
  onCapture?: (captureFunction: () => string) => void;
}) {
  const takeScreenshot = useScreenshot();
  const { scene } = useThree();

  const stableCapture = useCallback(() => {
    console.log(
      "Capturing screenshot...with:",
      scene.children.length,
      "children"
    );
    return takeScreenshot();
  }, [takeScreenshot]);

  useEffect(() => {
    if (onCapture) {
      onCapture(stableCapture);
    }
  }, [onCapture, stableCapture]);

  return null;
}

export default function WorkspaceScene({
  children,
  onScreenshotReady,
}: {
  children: React.ReactNode;
  onScreenshotReady?: (captureFunction: () => string) => void;
}) {
  const exportMode = useAtomValue(exportModeAtom);
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true, toneMapping: THREE.NoToneMapping }}
    >
      <CameraSetup />
      <Environment preset="sunset" />
      {children}
      <group name="SceneGroup" visible={!exportMode}>
        <OrbitControls makeDefault />
        <Grid
          name="Grid"
          position={[0, 0, 0]}
          args={[100, 100]}
          fadeDistance={100}
          fadeStrength={10}
          cellColor={"white"}
          cellSize={0.2}
          sectionColor={"white"}
          sectionSize={1}
          sectionThickness={0.5}
        />
      </group>
      <GizmoHelper
        alignment="bottom-center"
        name="GizmoHelper"
        margin={[80, 80]}
      >
        <GizmoViewport
          axisColors={["#FF1158", "#05FF69", "#04A5FF"]}
          labelColor="black"
        />
      </GizmoHelper>
      <SceneCapture onCapture={onScreenshotReady} />
      <SceneSetup />
    </Canvas>
  );
}
