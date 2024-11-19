"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function loginWithGoogle(): Promise<string | void> {
  const supabase = await createClient();
  console.log("Created Client");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    console.error("Error logging in:", error.message);
    return error.message;
  }
}
