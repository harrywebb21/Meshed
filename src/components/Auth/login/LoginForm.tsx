"use client";
import React from "react";
import Link from "next/link";
import Input from "@/components/design/ui/inputs/Input";
import Logo from "@/components/Logo";

import { login } from "./actions";
import { createClient } from "@/utils/supabase/client";
import { IoArrowBack } from "react-icons/io5";
import GoogleButton from "../GoogleAuth/GoogleButton";

export default function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [forgotPassword, setForgotPassword] = React.useState<boolean>(false);

  const supabase = createClient();

  const handleForgotPassword = async () => {
    setError(null);
    if (!email) {
      setError("Email is required");
      return;
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email!, {
      redirectTo: "http://localhost:3000/reset-password",
    });
    if (data) {
      alert("Password reset email sent");
    } else if (error) {
      console.error(error);
    }
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (!email.includes("@")) {
      setError("A Valid Email is required");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const data = await login(formData);
    if (data) {
      setError(data);
    }
  }

  if (forgotPassword) {
    return (
      <div className=" w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col w-fit bg-primary-gray-950 gap-4 p-4 rounded-lg shadow-md">
          <button
            onClick={() => setForgotPassword(false)}
            className="flex items-center gap-2 hover:text-primary-green w-fit"
          >
            <IoArrowBack size={16} className=" hover:text-primary-green" />
            <p className="hover:text-primary-green">Back</p>
          </button>
          <div className="flex items-center">
            <div className="w-24 h-24 flex items-center justify-center">
              <Logo green />
            </div>
            <div className="flex flex-col p-4">
              <h1 className="text-2xl font-semibold">Forgot Password</h1>
              <h2 className="text-md text-neutral-600">
                Please enter your email to reset your password
              </h2>
            </div>
          </div>
          <div className="bg-primary-gray-900 w-full h-full flex flex-col  gap-4 p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full flex items-center  gap-4">
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  className="w-32 hover:border-primary-green hover:bg-primary-gray-900 bg-neutral-800 border border-transparent font-semibold text-sm px-4 py-2 rounded-lg"
                  onClick={handleForgotPassword}
                >
                  Submit
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center ">
        <Logo className="w-32 " green />
      </div>
      <div className="p-4 rounded-xl bg-neutral-950 shadow-md flex flex-col items-center gap-4 ">
        <div className="min-w-64">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
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
              <button
                type="button"
                className="text-xs text-neutral-600 flex"
                onClick={() => setForgotPassword(true)}
              >
                <p>Forgot Password?</p>
              </button>
              {error && <p className="text-red-500">{error}</p>}
              <button className=" p-1 rounded-lg font-medium bg-primary-gray-950 text-neutral-600 border border-transparent hover:border-primary-green">
                login
              </button>
            </div>
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
      <GoogleButton type="login" />
    </>
  );
}
