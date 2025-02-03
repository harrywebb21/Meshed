"use client";

import { loginWithGoogle } from "./actions";
import Image from "next/image";

export default function GoogleButton({ type }: { type: "signup" | "login" }) {
  async function handleLoginWithGoogle() {
    console.log("Logging in with Google");
    const googleAuthError = await loginWithGoogle();
    if (googleAuthError) {
      console.error("Error logging in with Google:", googleAuthError);
    }
  }

  return (
    <>
      <div
        className="  px-4 py-2 bg-neutral-950 rounded-xl shadow-md flex flex-col items-center gap-4 cursor-pointer "
        onClick={handleLoginWithGoogle}
      >
        <button className="min-w-64  flex items-center justify-center gap-4">
          <Image
            src={"/google/google.svg"}
            width={24}
            height={100}
            alt=" google signin button"
          />
          <p className="text-neutral-600 hover:text-white">
            {type === "login" ? "Login" : "Sign up"} with Google
          </p>
        </button>
      </div>
    </>
  );
}
