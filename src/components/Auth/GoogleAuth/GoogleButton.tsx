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
      <div className="">
        <button
          onClick={handleLoginWithGoogle}
          className=" hover:scale-105 transition-all"
        >
          <Image
            src={
              type === "login"
                ? "/google/Google_SI.svg"
                : "/google/Google_SU.svg"
            }
            width={200}
            height={100}
            alt=" google signin button"
          />
        </button>
      </div>
    </>
  );
}
