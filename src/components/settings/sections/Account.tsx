"use client";
import ResetPasswordButton from "@/components/Auth/ResetPasswordButton";
import ResetPasswordModal from "@/components/Auth/ResetPasswordModoal";
import Input from "@/components/design/ui/inputs/Input";
import Loader from "@/components/Loader";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountSection() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);
  const supabase = createClient();

  const router = useRouter();

  const [displayName, setDisplayName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const handleChangePassword = async () => {
    if (!user?.email || profile?.email_type === "google") return;
    router.push("/settings/change-password");

    // const { data, error } = await supabase.auth.resetPasswordForEmail(
    //   user?.email,
    //   {
    //     redirectTo: "http://localhost:3000/settings/reset-password",
    //   }
    // );
    // if (data) {
    //   alert("Password reset email sent");
    // } else if (error) {
    //   console.error(error);
    // }
    setChangePasswordModalOpen(false);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("PASSWORD_RECOVERY", event, session);
      }
    });
  }, [supabase.auth]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setEmail(profile.email);
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full h-full rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-semibold">Account</h1>
        <h2 className="text-md text-neutral-600">Manage your Meshed profile</h2>
      </div>
      <div className="bg-primary-gray-900 w-full h-full flex flex-col  gap-4 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-full flex flex-col gap-2">
            <p className=" p-1 text-neutral-700">Display Name</p>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p className="p-1 text-neutral-700">Email </p>
              {profile.email_type === "google" && (
                <p className="text-neutral-700 text-sm px-1">
                  - Your email is handled by Google
                </p>
              )}
            </div>
            <Input
              type="email"
              disabled={profile.email_type === "google"}
              value={email}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className=" flex flex-col gap-2 w-56">
          <p className=" p-1 text-neutral-700">Password</p>
          <ResetPasswordButton
            onclick={() => setChangePasswordModalOpen(true)}
          />
          {changePasswordModalOpen && (
            <ResetPasswordModal
              onclickYes={() => handleChangePassword()}
              onclick={() => {
                setChangePasswordModalOpen(!changePasswordModalOpen);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
