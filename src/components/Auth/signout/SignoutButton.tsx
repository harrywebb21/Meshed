"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";

export default function SignoutButton() {
  const supabase = createClient();
  const router = useRouter();
  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  return (
    <button
      className="text-white hover:border-red-500 hover:bg-primary-gray-900 bg-neutral-800 border border-transparent rounded-lg shadow-md py-2 px-4 w-full flex items-center justify-center gap-2 transition-colors"
      onClick={handleSignOut}
    >
      <IoLogOutOutline />
      <p> Log out</p>
    </button>
  );
}
