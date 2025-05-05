"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function GetStartedButton() {
  const router = useRouter();
  async function handlePress() {
    const supabase = createClient();
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
    <button
      onClick={handlePress}
      className=" p-2 rounded-md bg-primary-green backdrop:blur-md border border-primary-green text-primary-gray-950 shadow-md font-medium"
    >
      Start Building
    </button>
  );
}
