"use server";

import { createClient } from "@/utils/supabase/server";
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

  if (error) {
    console.error("Error logging in:", error.message);

    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
  return;
}
