"use client";
import React from "react";
import { login } from "./actions";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("email", formData.get("email") as string);
    formData.append("password", formData.get("password") as string);
    const loginError = await login(formData);
    if (loginError) {
      setError(loginError);
    }
  }

  return (
    <div className="p-8 rounded-xl bg-neutral-900 shadow-xl flex flex-col items-center gap-4">
      <h1 className=" font-black text-4xl">MESHED</h1>
      <div className="">
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            className="border text-black p-2 rounded-xl"
            name="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border text-black p-2 rounded-xl"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="border p-2 rounded-xl">
            Login
          </button>
        </form>
      </div>
      <div className="flex gap-1">
        <h1>Don&apos;t have account yet?</h1>
        <Link href={"/signup"} className="">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
