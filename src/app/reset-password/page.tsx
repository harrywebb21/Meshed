"use client";
import Input from "@/components/design/ui/inputs/Input";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [updated, setUpdated] = useState<boolean>(false);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("PASSWORD_RECOVERY", event, session);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      return;
    }
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (data) {
      setUpdated(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 5000);
    } else if (error) {
      console.error(error);
    }
  };

  if (updated) {
    return (
      <div className=" w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col w-fit bg-primary-gray-950 gap-4 p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="w-24 h-24 flex items-center justify-center">
              <Logo green />
            </div>
            <div className="flex flex-col p-4">
              <h1 className="text-2xl font-semibold">Password Updated</h1>
              <h2 className="text-md text-neutral-600">
                Your password has been updated
              </h2>
            </div>
          </div>
          <div className="bg-primary-gray-900 w-full h-full flex flex-col  gap-4 p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full flex items-center  gap-4">
                <p className=" p-1 text-neutral-600">
                  Please wait while we redirect you!
                </p>

                <Loader w="w-2" h="h-2" logo={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col w-fit bg-primary-gray-950 gap-4 p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="w-24 h-24 flex items-center justify-center">
            <Logo green />
          </div>
          <div className="flex flex-col p-4">
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <h2 className="text-md text-neutral-600">
              Create a new password for your account
            </h2>
          </div>
        </div>
        <div className="bg-primary-gray-900 w-full h-full flex flex-col  gap-4 p-4 rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full flex flex-col gap-2">
              <p className=" p-1 text-neutral-700">New Password</p>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p className=" p-1 text-neutral-700">Confirm Password</p>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="w-full hover:border-primary-green hover:bg-primary-gray-900 bg-neutral-800 border border-transparent font-semibold text-sm px-4 py-2 rounded-lg"
              onClick={() => handlePasswordReset()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
