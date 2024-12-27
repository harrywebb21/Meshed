import GoogleButton from "@/components/Auth/GoogleAuth/GoogleButton";
import SignupForm from "@/components/Auth/signup/SignupForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Signup() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className=" w-full h-svh flex flex-col items-center gap-4 justify-center">
      <SignupForm />
      <GoogleButton type="signup" />
    </div>
  );
}
