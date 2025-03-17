"use client";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import UserAvatar from "../design/ui/users/UserAvatar";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import SignoutButton from "../Auth/signout/SignoutButton";
import SettingsButton from "../settings/SettingsButton";

export default function UserNameTag() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);

  return (
    <>
      <div className="flex gap-2 items-center relative">
        {profile && <UserAvatar user={profile} />}
        <button
          data-popover="true"
          data-tip="Sign out"
          onClick={() => setIsOpen(!isOpen)}
          className="flex  items-center justify-center gap-2"
        >
          <h3 className="text-md font-semibold">{profile?.display_name}</h3>
          {isOpen ? (
            <FaChevronUp className="text-sm" />
          ) : (
            <FaChevronDown className="text-sm" />
          )}
        </button>

        <div
          className={`absolute top-12 -left-3 w-72  ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-primary-gray-900 border border-primary-green rounded-xl shadow-md p-2 flex flex-col gap-2  w-full">
            <div className="flex  gap-2 items-center">
              {profile && <UserAvatar user={profile} />}
              <div className="flex flex-col">
                <h3 className="text-md font-semibold">
                  {profile?.display_name}
                </h3>
                <p className="text-sm text-neutral-700">{profile?.email}</p>
              </div>
            </div>
            <SettingsButton />
            <SignoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
