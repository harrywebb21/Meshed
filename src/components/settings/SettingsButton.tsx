"use client";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";

export default function SettingsButton() {
  const router = useRouter();
  return (
    <button
      className="text-white hover:border-primary-green bg-neutral-800 border border-transparent rounded-lg shadow-md py-2 px-4 w-full flex items-center justify-center gap-2"
      onClick={() => router.push("/settings")}
    >
      <IoSettingsOutline />
      <p> Settings</p>
    </button>
  );
}
