"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const supabase = createClient();
  const router = useRouter();
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  return (
    <button className="bg-red-500 text-white p-2 rounded-md" onClick={signOut}>
      Sign Out
    </button>
  );
}
