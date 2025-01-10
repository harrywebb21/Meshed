"use server";
import { createClient } from "@/utils/supabase/server";
import { type Session, type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function loginWithGoogle(): Promise<string | void> {
  const supabase = await createClient();

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

export async function handleGoogleCallback(sessionData: {
  user: User | null;
  session: Session | null;
}): Promise<void> {
  const supabase = await createClient();

  const user = sessionData.user;

  // Check if the user profile exists
  const { data: userProfile, error: profileError } = await supabase
    .from("Profile")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  if (profileError && profileError.code !== "PGRST116") {
    console.error("Error fetching user profile:", profileError.message);
    return;
  }

  // If the profile doesn't exist, create a new one
  if (!userProfile) {
    const { error: insertError } = await supabase.from("Profile").insert([
      {
        user_id: user!.id,
        email: user!.email,
        display_name: user!.user_metadata.full_name,
        profile_pic_url: user!.user_metadata.avatar_url,
      },
    ]);

    if (insertError) {
      console.error("Error inserting user profile:", insertError.message);
      return;
    }
    console.info("User profile created successfully");
  }
}
