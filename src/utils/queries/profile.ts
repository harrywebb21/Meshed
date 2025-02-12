import { createClient } from "../supabase/client";
import { Profile } from "../supabase/types/dbTypes";

const supabase = createClient();

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .single();

  if (error) {
    throw error;
  }
  return data;
}
