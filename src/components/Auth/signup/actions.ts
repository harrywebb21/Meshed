"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData): Promise<string | void> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        display_name: formData.get("display_name") as string,
      },
    },
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  const { error: profileError } = await supabase.from("profiles").insert([
    {
      user_id: user?.id,
      email: formData.get("email") as string,
      display_name: formData.get("display_name") as string,
    },
  ]);

  if (profileError) {
    console.error("Error creating profile:", profileError.message);
    return profileError.message;
  }

  handleSignupWithEmailCallback(user);
  if (error) {
    console.error("Error logging in:", error.message);

    return error.message;
  }
  console.info("User signed up successfully");
}

export async function handleSignupWithEmailCallback(user: User | null) {
  const supabase = await createClient();
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
        display_name: user!.user_metadata.display_name,
        profile_pic_url: user!.user_metadata.avatar_url,
      },
    ]);

    if (insertError) {
      console.error("Error inserting user profile:", insertError.message);
      return;
    }
    console.info("User profile created successfully");
  }

  revalidatePath("/", "layout");
  redirect("/signup/confirmation");
}
