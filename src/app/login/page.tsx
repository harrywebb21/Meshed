import React from "react";

import GoogleButton from "@/components/Auth/GoogleAuth/GoogleButton";
import LoginForm from "@/components/Auth/login/LoginForm";

export default function Login() {
  return (
    <>
      <div className=" w-full h-svh flex flex-col items-center gap-4 justify-center">
        <LoginForm />
        <GoogleButton type="login" />
      </div>
    </>
  );
}
