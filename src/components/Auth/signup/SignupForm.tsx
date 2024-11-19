"use client";
import Link from "next/link";
import React from "react";
import { signup } from "./actions";

export default function SignupForm() {
  const [error, setError] = React.useState<string | null>(null);

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (formData.get("password") !== formData.get("confirm-password")) {
      setError("Passwords do not match");
      return;
    }
    const password = formData.get("password")?.toString();
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (
      !formData.get("display_name") ||
      !formData.get("email") ||
      !formData.get("password") ||
      !formData.get("confirm-password")
    ) {
      setError("Please fill in all fields");
      return;
    }
    formData.append("display_name", formData.get("display_name") as string);
    formData.append("email", formData.get("email") as string);
    formData.append("password", formData.get("password") as string);
    const loginError = await signup(formData);
    if (loginError) {
      setError(loginError);
    }
  }

  return (
    <div className="p-8 rounded-xl bg-neutral-900 shadow-xl flex flex-col items-center gap-4">
      <h1 className=" font-black text-4xl">MESHED</h1>
      <div className="">
        <form onSubmit={handleSignup} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Display Name"
            className="border text-black p-1 rounded-md"
            name="display_name"
          />
          <input
            type="email"
            placeholder="Email"
            className="border text-black p-1 rounded-md"
            name="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border text-black p-1 rounded-md"
          />
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            className="border text-black p-1 rounded-md"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="border p-2 rounded-xl">
            Create account
          </button>
        </form>
      </div>
      <div className="flex gap-1">
        <h1>Already have an account?</h1>
        <Link href={"/login"} className="">
          Log In
        </Link>
      </div>
    </div>
  );
}
