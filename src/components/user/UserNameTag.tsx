"use client";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import SignoutButton from "../Auth/signout/SignoutButton";
import UserAvatar from "../design/ui/users/UserAvatar";

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
          <h3 className="text-lg font-semibold">{profile?.display_name}</h3>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <div
          className={`absolute top-12 left-0 w-32  ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-primary-gray-950  rounded-xl shadow-md p-2 border border-primary-gray-900  w-full">
            <SignoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
