"use client";
import { useState } from "react";

interface InputProps {
  label: string;
  type: string;
  value: string | number | boolean | undefined;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  returnValue?: (value: string | number | boolean) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type,
  value,
  onChange,
  returnValue,
  onBlur,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [previousValue, setPreviousValue] = useState<string | number | boolean>(
    value ?? ""
  );

  return (
    <>
      {type === "select" ? (
        <Dropdown
          label={label}
          value={value?.toString() || ""}
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          onChange={(value) => {
            onChange({
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>);
            if (returnValue) {
              returnValue(value === "true");
            }
          }}
        />
      ) : (
        <div
          className={`${
            isFocused && isEmpty
              ? "border-red-500"
              : isFocused
              ? " border-primary-green "
              : " border-transparent"
          }  bg-primary-gray-950 rounded-md flex items-center gap-2 pl-2 w-full border`}
        >
          <label className="text-neutral-600">{label}</label>
          <input
            type={type}
            className={`${
              type === "number"
                ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full"
                : ""
            } ${
              type === "color"
                ? "appearance-none w-full [&::-webkit-color-swatch]:appearance:none [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-sm [&::-moz-color-swatch]:appearance:none [&::-ms-color-swatch]:appearance:none"
                : " "
            } bg-transparent p-1 outline-none text-white shadow-md`}
            onFocus={() => {
              setIsFocused(true);
              setPreviousValue(value ?? "");
            }}
            onBlur={(e) => {
              if (onBlur) {
                onBlur(e);
              }
              setIsFocused(false);
              if (e.target.value === "") {
                if (returnValue) {
                  returnValue(previousValue);
                }
                setIsEmpty(false);
              }
            }}
            value={typeof value === "boolean" ? value.toString() : value}
            onChange={(e) => {
              onChange(e);
              if (returnValue) {
                returnValue(e.target.value);
              }
              if (e.target.value === "") {
                setIsEmpty(true);
              } else {
                setIsEmpty(false);
              }
            }}
          />
        </div>
      )}
    </>
  );
}

interface DropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function Dropdown({ label, value, options, onChange }: DropdownProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleSelect = (option: { label: string; value: string }) => {
    onChange(option.value);
    setIsOpened(false);
  };

  return (
    <div
      className={`${
        isOpened ? "border-primary-green  " : "border-transparent"
      }  bg-primary-gray-950 rounded-md flex items-center gap-2 pl-2 w-full border `}
    >
      <label className="text-neutral-600">{label}</label>
      <div className="relative w-full h-full">
        <button
          className="w-full  p-1 rounded-md flex items-center justify-between  h-full "
          onClick={() => setIsOpened(!isOpened)}
        >
          {value === "true" ? "Yes" : "No"}
        </button>
        {isOpened && (
          <div
            className={`${
              isOpened ? "border-transparent" : "border-transparent"
            } border absolute top-full mt-2 w-full bg-primary-gray-900 rounded-b-md shadow-md p-2 flex flex-col gap-2`}
          >
            {options.map((option) => (
              <button
                key={option.value}
                className="w-full py-1 px-2 text-left bg-primary-gray-950 rounded-md hover:bg-primary-gray-900 border border-transparent hover:border-primary-green shadow-md"
                onClick={() => {
                  handleSelect(option);
                  setIsOpened(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
