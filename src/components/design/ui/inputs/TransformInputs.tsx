import { Mesh } from "@/utils/supabase/types/dbTypes";
import Input from "./Input";
import { Transform } from "@/utils/hooks/mesh-hooks/useTransform";

interface TransformInputsProps {
  pos_x: number;
  pos_y?: number;
  pos_z?: number;
  rot_x?: number;
  rot_y?: number;
  rot_z?: number;
  scale_x?: number;
  scale_y?: number;
  scale_z?: number;
  updateTransform: (
    type: keyof Transform,
    axis: "x" | "y" | "z",
    value: number
  ) => void;
  handleInputMutation: (value: Partial<Mesh>) => void;
}

export default function TransformInputs({ ...props }: TransformInputsProps) {
  const getValue = (num: number | undefined): string => {
    if (num === undefined || Number.isNaN(num)) return "";
    return num.toString();
  };
  return (
    <div className="  bg-primary-gray-900 rounded-lg shadow-md flex flex-col">
      <h1 className=" text-sm  bg-neutral-800 w-full p-2 rounded-lg shadow-md">
        Transform
      </h1>
      <div className="p-2">
        <div className="flex flex-col max-w-56 gap-2">
          <h1 className=" text-sm text-neutral-600">Position</h1>
          <div className="flex gap-2 items-center">
            <Input
              label="X"
              type="number"
              value={getValue(props.pos_x)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("position", "x", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    pos_x: value,
                  });
                }
              }}
            />
            <Input
              label="Y"
              type="number"
              value={getValue(props.pos_y)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("position", "y", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    pos_y: value,
                  });
                }
              }}
            />

            <Input
              label="Z"
              type="number"
              value={getValue(props.pos_z)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("position", "z", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    pos_z: value,
                  });
                }
              }}
            />
          </div>
          <h1 className=" text-sm text-neutral-600">Rotation</h1>
          <div className="flex gap-2 items-center">
            <Input
              label="X"
              type="number"
              value={getValue(props.rot_x)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("rotation", "x", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    rot_x: value,
                  });
                }
              }}
            />
            <Input
              label="Y"
              type="number"
              value={getValue(props.rot_y)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("rotation", "y", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    rot_y: value,
                  });
                }
              }}
            />

            <Input
              label="Z"
              type="number"
              value={getValue(props.rot_z)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("rotation", "z", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    rot_z: value,
                  });
                }
              }}
            />
          </div>
          <h1 className=" text-sm text-neutral-600">Scale</h1>
          <div className="flex gap-2 items-center">
            <Input
              label="X"
              type="number"
              value={getValue(props.scale_x)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("scale", "x", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    scale_x: value,
                  });
                }
              }}
            />
            <Input
              label="Y"
              type="number"
              value={getValue(props.scale_y)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("scale", "y", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    scale_y: value,
                  });
                }
              }}
            />

            <Input
              label="Z"
              type="number"
              value={getValue(props.scale_z)}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                props.updateTransform("scale", "z", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    scale_z: value,
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
