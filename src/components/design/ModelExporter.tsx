import { sceneAtom } from "@/utils/jotai-atoms/sceneAtom";
import { useAtomValue } from "jotai";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
export default function ModelExporter() {
  const scene = useAtomValue(sceneAtom);

  const exportModel = () => {
    if (!scene) return;

    const exporter = new GLTFExporter();
    if (scene) {
      console.log("Scene to export:", scene);
      console.log("Number of children:", scene.children.length);
      console.log("Children:", scene.children);
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
        },
        (error) => {
          console.error("An error happened during export", error);
        },
        { binary: true }
      );
    } else {
      console.error("Scene is null and cannot be exported.");
    }
  };

  return (
    <button
      onClick={exportModel}
      className="bg-primary-green text-primary-gray-950 p-2 px-3 text-sm rounded-md font-bold"
    >
      Export
    </button>
  );
}
