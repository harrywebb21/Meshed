"use client";
import React from "react";
import { login } from "./actions";
import Link from "next/link";
import Input from "@/components/design/ui/inputs/Input";
import Logo from "@/components/Logo";

export default function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (!email.includes("@")) {
      setError("A Valid Email is required");
      return;
    }
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("email", email as string);
    formData.append("password", formData.get("password") as string);
    const loginError = await login(formData);
    if (loginError) {
      setError(loginError);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center ">
        <Logo className="w-32 " green />
      </div>
      <div className="p-4 rounded-xl bg-neutral-950 shadow-md flex flex-col items-center gap-4 ">
        <div className="min-w-64">
          <form onSubmit={handleLogin} className="flex flex-col gap-2">
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
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className=" p-1 rounded-lg font-medium bg-primary-gray-950 text-neutral-600 border border-transparent hover:border-primary-green"
            >
              login
            </button>
          </form>
        </div>
        <div className="flex gap-1">
          <h1 className=" text-sm text-neutral-600">
            Don&apos;t have account yet?
          </h1>
          <Link href={"/signup"} className=" text-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
