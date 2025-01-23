import { Shape } from "@/utils/hooks/mesh-hooks/useShapeValueTransform";
import Input from "./Input";
import { Mesh } from "@/utils/supabase/types/dbTypes";

interface ShapeInputsProps {
  shapeData: Shape;
  handleInputMutation: (data: Partial<Mesh>) => void;
  updateShape: (key: keyof Shape, value: number | boolean) => void;
}

export default function ShapeInputs({ ...props }: ShapeInputsProps) {
  const geometryInputs = () => {
    switch (props.shapeData.type) {
      case "cube":
        return <CubeInputs {...props} />;
      case "sphere":
        return <SphereInputs {...props} />;
      case "cylinder":
        return <CylinderInputs {...props} />;
    }
  };

  return (
    <>
      <div className="  bg-primary-gray-900 rounded-lg shadow-md flex flex-col">
        <h1 className=" text-sm  bg-neutral-800 w-full p-2 rounded-lg shadow-md">
          Shape
        </h1>

        <div className="p-2">{geometryInputs()}</div>
      </div>
    </>
  );
}

function CubeInputs({
  shapeData,
  handleInputMutation,
  updateShape,
}: ShapeInputsProps) {
  return (
    <div className="flex flex-col max-w-56 gap-2">
      <h1 className=" text-sm text-neutral-600">Size</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="W"
          value={shapeData.width}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("width", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                width: value,
              });
            }
          }}
        />
        <Input
          label="H"
          value={shapeData?.height}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("height", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                height: value,
              });
            }
          }}
        />

        <Input
          label="D"
          value={shapeData.depth}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("depth", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                depth: value,
              });
            }
          }}
        />
      </div>
      <h1 className=" text-sm text-neutral-600">Side Segments</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="W"
          value={shapeData.widthSegments}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("widthSegments", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                width_segments: value,
              });
            }
          }}
        />

        <Input
          label="H"
          value={shapeData.heightSegments}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("heightSegments", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                height_segments: value,
              });
            }
          }}
        />
        <Input
          label="D"
          value={shapeData.depthSegments}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("depthSegments", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                depth_segments: value,
              });
            }
          }}
        />
      </div>
    </div>
  );
}

function SphereInputs({
  shapeData,
  handleInputMutation,
  updateShape,
}: ShapeInputsProps) {
  return (
    <div className="flex flex-col max-w-56 gap-2">
      <h1 className=" text-sm text-neutral-600">Radius</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="R"
          value={shapeData.radius}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("radius", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                radius: value,
              });
            }
          }}
        />
      </div>
      <h1 className=" text-sm text-neutral-600">Side Segments</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="W"
          value={shapeData.widthSegments}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("widthSegments", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                width_segments: value,
              });
            }
          }}
        />

        <Input
          label="H"
          value={shapeData.heightSegments}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("heightSegments", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                height_segments: value,
              });
            }
          }}
        />
      </div>
      <h1 className=" text-sm text-neutral-600">Theta</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="Start"
          value={shapeData.thetaStart}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("thetaStart", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                theta_start: value,
              });
            }
          }}
        />

        <Input
          label="Length"
          value={shapeData.thetaLength}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("thetaLength", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                theta_length: value,
              });
            }
          }}
        />
      </div>
      <h1 className=" text-sm text-neutral-600">Phi</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="Start"
          value={shapeData.phiStart}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("phiStart", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                phi_start: value,
              });
            }
          }}
        />

        <Input
          label="Length"
          value={shapeData.phiLength}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("phiLength", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                phi_length: value,
              });
            }
          }}
        />
      </div>
    </div>
  );
}

function CylinderInputs({
  shapeData,
  handleInputMutation,
  updateShape,
}: ShapeInputsProps) {
  return (
    <div className="flex flex-col max-w-56 gap-2">
      <h1 className=" text-sm text-neutral-600">Radius</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="Top"
          value={shapeData.radiusTop}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("radiusTop", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                radius_top: value,
              });
            }
          }}
        />
        <Input
          label="Bottom"
          value={shapeData.radiusBottom}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("radiusBottom", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                radius_bottom: value,
              });
            }
          }}
        />
      </div>
      <h1 className=" text-sm text-neutral-600">Size</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="Height"
          value={shapeData.height}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("height", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                height: value,
              });
            }
          }}
        />
      </div>
      <h1 className=" text-sm text-neutral-600">Side Segments</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="R"
          value={shapeData.radialSegments}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("radialSegments", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                radial_segments: value,
              });
            }
          }}
        />
        <Input
          label="H"
          value={shapeData.heightSegments}
          type="number"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShape("heightSegments", value);
            if (!Number.isNaN(value)) {
              handleInputMutation({
                height_segments: value,
              });
            }
          }}
        />
      </div>

      <h1 className=" text-sm text-neutral-600">Ends</h1>
      <div className="flex w-full items-center gap-2">
        <Input
          label="Open"
          value={shapeData.openEnded}
          type="select"
          onChange={(e) => {
            const value = e.target.value;
            updateShape("openEnded", value === "true" ? true : false);
            handleInputMutation({
              open_ended: value === "true" ? true : false,
            });
          }}
        />
      </div>
    </div>
  );
}
