"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export default async function deleteAccount(
  userId: string,
  confirmPhrase: string
) {
  if (confirmPhrase !== "DELETE MY ACCOUNT") {
    return { success: false, error: "Invalid confirmation phrase" };
  }
  try {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || session.user.id !== userId) {
      throw new Error("Invalid user session");
    }

    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      throw new Error(error.message);
    }

    await supabase.from("profiles").delete().eq("id", userId);

    revalidatePath("/");

    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as AuthError).message };
  }
}
