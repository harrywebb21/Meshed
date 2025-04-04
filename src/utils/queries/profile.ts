import { createClient } from "../supabase/client";
import { Profile } from "../supabase/types/dbTypes";

const supabase = createClient();

export async function getProfile(userId: string): Promise<Profile> {
  const { data: profile, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .single();
  if (error) {
    throw error;
  }
  if (profile) {
    if (profile.profile_pic_url) {
      const { data: imgData, error: imgError } = await supabase.storage
        .from("profile-pictures")
        .createSignedUrl(profile.profile_pic_url, 86400);
      if (imgError) {
        console.error("Error fetching workspace preview:", imgError.message);
      }
      if (imgData) {
        profile.profile_pic_url = imgData.signedUrl;
      }
    }
  }

  return profile;
}

export async function getUserByEmail(email: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("email", email)
    .limit(1)
    .single();

  if (error) {
    throw new Error("Couldn't find user with that email");
  }
  return data;
}

export async function updateProfileImage(
  userId: string | undefined,
  file: File
) {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("profile-pictures")
    .upload(`${userId}`, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const imageUrl = uploadData?.path;

  if (!imageUrl) {
    throw new Error("Couldn't upload image");
  }

  const { error } = await supabase
    .from("Profile")
    .update({
      profile_pic_url: imageUrl,
    })
    .eq("user_id", userId);

  if (error) {
    return { success: false, error };
  }

  return { success: true };
}

export async function updateProfile(
  userId: string | undefined,
  displayName: string | null,
  email: string | undefined,
  colour: string | null
) {
  const profile = await getProfile(userId as string);
  const updates = [];

  if (profile.display_name !== displayName && displayName) {
    const { error: displayNameError } = await supabase
      .from("Profile")
      .update({
        display_name: displayName,
      })
      .eq("user_id", userId);
    if (displayNameError) {
      return { success: false, error: displayNameError };
    }
    updates.push("Display name");
  }

  if (profile.email !== email && email) {
    const { error: profileEmailError } = await supabase
      .from("Profile")
      .update({
        email: email,
      })
      .eq("user_id", userId);

    if (profileEmailError) {
      return { success: false, error: profileEmailError };
    }

    const { data: updateAuthData, error: updateAuthError } =
      await supabase.auth.updateUser({
        email: email,
      });

    if (updateAuthError) {
      return { success: false, error: updateAuthError };
    }
    if (updateAuthData) {
      return {
        success: true,
        toastTitle: "Email changed",
        message: "Please check your email to confirm the change.",
      };
    }
  }
  if (profile.profile_colour !== colour && colour) {
    const { error: colourError } = await supabase
      .from("Profile")
      .update({
        profile_colour: colour,
      })
      .eq("user_id", userId);
    if (colourError) {
      return { success: false, error: colourError };
    }
    updates.push("Theme colour");
  }

  if (updates.length === 0) {
    return { success: false, error: "No updates made" };
  }

  return {
    success: true,
    toastTitle: "Profile updated",
    message: `${updates.join(", ")} updated`,
  };
}
