"use client";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import Image from "next/image";

export default function UserNameTag() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);

  return (
    <>
      <div className="flex gap-2 ">
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
      </div>
    </>
  );
}
