import { Profile } from "@/utils/supabase/types/dbTypes";
import Image from "next/image";

interface UserAvatarProps {
  user: Profile;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="">
      {user.profile_pic_url ? (
        <Image
          src={user.profile_pic_url}
          alt={user.display_name || "User Avatar"}
          className="rounded-full w-8 h-8 shadow-sm"
          width={32}
          height={32}
        />
      ) : (
        <div
          style={{ backgroundColor: user.profile_colour || "#000" }}
          className={
            "rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
          }
        >
          <p className="text-white text-sm font-bold  uppercase">
            {user.display_name?.charAt(0)}
          </p>
        </div>
      )}
    </div>
  );
}
