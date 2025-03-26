"use client";
import Input from "@/components/design/ui/inputs/Input";
import Loader from "@/components/Loader";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteAccountModal from "@/components/Auth/DeleteAccountModal";
import ChangePasswordButton from "@/components/Auth/ChangePasswordButton";

export default function AccountSection() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);
  const supabase = createClient();

  const router = useRouter();

  const [displayName, setDisplayName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");

  const handleChangePassword = async () => {
    if (!user?.email || profile?.email_type === "google") return;
    router.push("/settings/change-password");
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
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
              <div className="flex w-full flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap items-center gap-2">
                <div className=" flex flex-col w-full">
                  <p className=" px-1 text-lg font-semibold">Display Name</p>
                  <p className=" px-1 text-sm text-neutral-600">
                    This is how your name will appear on Meshed
                  </p>
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
              <div className="flex w-full flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap items-center gap-2">
                <div className=" flex flex-col  w-full">
                  <p className=" px-1 text-lg font-semibold">Email</p>
                  {profile.email_type === "google" ? (
                    <p className=" px-1 text-sm text-neutral-600">
                      Your email is handled by Google
                    </p>
                  ) : (
                    <p className=" px-1 text-sm text-neutral-600">
                      Change your email for your Meshed account
                    </p>
                  )}
                </div>
                <div className="w-full">
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
            </div>
          </div>

          <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
            <div className="flex w-full items-center gap-2">
              <div className=" flex flex-col w-full">
                <p className=" px-1 text-lg font-semibold">Password</p>
                <p className=" px-1 text-sm text-neutral-600">
                  {profile.email_type === "google"
                    ? "Your password is handled by Google"
                    : "Change your password for your Meshed account"}
                </p>
              </div>
              {profile.email_type === "google" ? null : (
                <div className="w-56">
                  <ChangePasswordButton onClick={handleChangePassword} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
          <div className="flex w-full items-center gap-2">
            <div className=" flex flex-col w-full">
              <p className=" px-1 text-lg font-semibold">Delete Account</p>
              <p className="px-1 text-neutral-600 text-sm">
                Permanently delete your account and all your data
              </p>
            </div>
            <div className="w-56">
              <DeleteAccountModal userId={user?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
