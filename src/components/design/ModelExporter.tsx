import { exportModeAtom, sceneAtom } from "@/utils/jotai-atoms/sceneAtom";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import Loader from "../Loader";
export default function ModelExporter() {
  const scene = useAtomValue(sceneAtom);
  const setExportMode = useSetAtom(exportModeAtom);
  const exportMode = useAtomValue(exportModeAtom);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    console.log("Export mode changed:", exportMode);
  }, [exportMode]);

  const exportModel = () => {
    if (!scene) return;

    const exporter = new GLTFExporter();
    if (scene) {
      setExportMode(true);
      setIsExporting(true);
      setTimeout(() => {
        exporter.parse(
          scene,
          (gltf) => {
            let blob;
            let extension;

            if (gltf instanceof ArrayBuffer) {
              blob = new Blob([gltf], { type: "application/octet-stream" });
              extension = "glb";
            } else {
              const output = JSON.stringify(gltf, null, 2);
              blob = new Blob([output], { type: "application/json" });
              extension = "gltf";
            }

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `scene.${extension}`;
            link.click();

            URL.revokeObjectURL(url);
            console.log("Model exported successfully!");
            setExportMode(false);
            setIsExporting(false);
          },
          (error) => {
            console.error("An error happened during export", error);
            setExportMode(false);
          },
          { binary: true }
        );
      }, 5000); // Delay for 5 seconds
    } else {
      console.error("Scene is null and cannot be exported.");
    }
  };

  return (
    <>
      <button
        onClick={exportModel}
        className="bg-primary-gray-900 text-white py-2 px-3 text-xs rounded-md font-semibold w-20 flex items-center justify-center border border-transparent hover:border-primary-green transition-all duration-200 ease-in-out"
      >
        {isExporting ? <Loader logo={false} h="h-4" w="w-4" /> : "Export"}
      </button>
    </>
  );
}
