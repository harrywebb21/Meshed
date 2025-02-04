"use client";
import Link from "next/link";
import React from "react";
import Input from "@/components/design/ui/inputs/Input";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/client";

export default function SignupForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = React.useState<string | null>(
    null
  );
  const [displayName, setDisplayName] = React.useState<string | null>(null);

  const supabase = createClient();

  async function handleSignup() {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!displayName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("display_name", displayName);

    await supabase.auth.signUp({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      options: {
        data: {
          display_name: formData.get("display_name") as string,
        },
        emailRedirectTo: "https://meshed.art/dashboard",
      },
    });
  }

  return (
    <>
      <div className="flex flex-col items-center ">
        <Logo className="w-32 " green />
      </div>
      <div className="p-4 rounded-xl bg-neutral-950 shadow-md flex flex-col items-center gap-4 ">
        <div className="min-w-64">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-neutral-600">
              Display Name
            </label>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
            <label htmlFor="email" className="text-neutral-600">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("@")) {
                  setError("A Valid Email is required");
                } else {
                  setError(null);
                }
              }}
            />

            <label htmlFor="password" className="text-neutral-600">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="password" className="text-neutral-600">
              Confirm Password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              onBlur={(e) => {
                if (password !== e.target.value) {
                  setError("Passwords do not match");
                } else {
                  setError(null);
                }
              }}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleSignup}
              className=" p-1 rounded-lg font-medium bg-primary-gray-950 text-neutral-600 border border-transparent hover:border-primary-green"
            >
              create account
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          <h1 className=" text-sm text-neutral-600">
            Already have an account?
          </h1>
          <Link href={"/login"} className=" text-sm">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
