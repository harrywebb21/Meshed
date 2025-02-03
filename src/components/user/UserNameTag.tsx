"use client";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import SignoutButton from "../Auth/signout/SignoutButton";

export default function UserNameTag() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);

  return (
    <>
      <div className="flex gap-2 items-center relative">
        {profile?.profile_pic_url && (
          <Image
            src={profile.profile_pic_url}
            alt="user avatar"
            className="h-8 w-8 rounded-full"
            width={40}
            height={40}
          />
        )}

        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">{profile?.display_name}</h3>
        </div>
        <button
          data-popover="true"
          data-tip="Sign out"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <div
          className={`absolute top-12 left-0 w-full  ${
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
