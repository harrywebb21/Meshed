import { Profile } from "@/utils/supabase/types/dbTypes";
import Image from "next/image";

interface UserAvatarProps {
  user: Profile;
  randomTailwindBorder?: string;
}

export default function UserAvatar({
  user,
  randomTailwindBorder,
}: UserAvatarProps) {
  return (
    <div className="">
      {user.profile_pic_url && (
        <Image
          src={user.profile_pic_url}
          alt={user.display_name || "User Avatar"}
          className="rounded-full w-8 h-8"
          width={32}
          height={32}
        />
      )}
      <div
        className={` bg-primary-gray-900 border-2 ${randomTailwindBorder} rounded-full w-8 h-8 flex items-center justify-center`}
      >
        <p className="text-white text-sm font-bold  uppercase">
          {user.display_name?.charAt(0)}
        </p>
      </div>
    </div>
  );
}
