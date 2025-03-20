"use client";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";

export default function SettingsButton() {
  const router = useRouter();
  return (
    <button
      className="text-white hover:border-primary-green hover:bg-primary-gray-900 bg-neutral-800 border border-transparent rounded-lg shadow-md py-2 px-4 w-full flex items-center justify-center gap-2 transition-colors"
      onClick={() => router.push("/settings")}
    >
      <IoSettingsOutline />
      <p> Settings</p>
    </button>
  );
}
