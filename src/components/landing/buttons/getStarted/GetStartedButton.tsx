"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";

export default function GetStartedButton() {
  const router = useRouter();
  async function handlePress() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  }

  return (
    <button onClick={handlePress} className=" p-2 border rounded-xl">
      Start Meshing
    </button>
  );
}
