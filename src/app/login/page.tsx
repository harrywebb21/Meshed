import React from "react";

import GoogleButton from "@/components/Auth/GoogleAuth/GoogleButton";
import LoginForm from "@/components/Auth/login/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className=" w-full h-svh flex flex-col items-center gap-4 justify-center">
        <LoginForm />
        <GoogleButton type="login" />
      </div>
    </>
  );
}
