"use client";
import Input from "@/components/design/ui/inputs/Input";
import Loader from "@/components/Loader";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { useEffect, useState } from "react";

export default function AccountSection() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);

  const [displayName, setDisplayName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setEmail(
        profile.email_type === "google"
          ? `${profile.email} (handled by Google)`
          : profile.email
      );
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
      <div className="bg-primary-gray-900 w-full h-full flex  gap-4 p-4 rounded-lg shadow-md">
        <div className="w-full flex flex-col gap-2">
          <p>Display Name</p>
          <Input
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <p className=" text-neutral-700">Email</p>
          <Input
            type="text"
            disabled={profile.email_type === "google"}
            value={email}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
