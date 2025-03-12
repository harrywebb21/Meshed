import { Profile, Workspace } from "@/utils/supabase/types/dbTypes";

export async function sendEmail(user: Profile, workspace: Workspace) {
  const response = await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, workspace }),
  });

  if (!response.ok) {
    throw new Error("Error sending email");
  }
  const data = await response.json();
  return data;
}
