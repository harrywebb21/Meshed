import { Profile } from "@/utils/supabase/types/dbTypes";
import Image from "next/image";

interface UserAvatarProps {
  user: Profile;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="">
      {user.profile_pic_url ? (
        <div className="relative overflow-hidden rounded-full w-8 h-8 shadow-sm flex items-center justify-center">
          <Image
            src={user.profile_pic_url}
            alt={user.display_name || "User Avatar"}
            fill
            sizes="100%"
            quality={100}
            style={{
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />
        </div>
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
