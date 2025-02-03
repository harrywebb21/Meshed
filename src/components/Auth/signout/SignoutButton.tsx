"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const supabase = createClient();
  const router = useRouter();
  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  return (
    <button
      className="text-white hover:text-red-500 bg-primary-gray-900  rounded-lg shadow-md py-2 px-4 w-full"
      onClick={handleSignOut}
    >
      Sign out
    </button>
  );
}
