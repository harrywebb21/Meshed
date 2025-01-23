import { Mesh } from "@/utils/supabase/types/dbTypes";
import Input from "./Input";
import { Material } from "@/utils/hooks/mesh-hooks/useMaterialTransform";

interface MaterialInputsProps {
  colour: string | null;
  wireframe: boolean | null;
  updateMaterial: (type: keyof Material, value: string) => void;
  handleInputMutation: (value: Partial<Mesh>) => void;
}

export default function materialInputs({ ...props }: MaterialInputsProps) {
  return (
    <div className="  bg-primary-gray-900 rounded-lg shadow-md flex flex-col">
      <h1 className=" text-sm  bg-neutral-800 w-full p-2 rounded-lg shadow-md">
        Material
      </h1>

      <div className="p-2">
        <div className="flex flex-col max-w-56 gap-2">
          <h1 className=" text-sm text-neutral-600">colour</h1>

          <div className="flex-col w-full items-center gap-2">
            <Input
              label="Colour"
              value={props.colour}
              type="color"
              onChange={(e) => {
                const value = e.target.value;
                props.updateMaterial("colour", value);
                if (!Number.isNaN(value)) {
                  props.handleInputMutation({
                    colour: value,
                  });
                }
              }}
            />
            <Input
              label="Wireframe"
              value={props.wireframe}
              type="select"
              onChange={(e) => {
                const value = e.target.value;
                props.updateMaterial("wireframe", value);

                props.handleInputMutation({
                  wireframe: value === "true" ? true : false,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
