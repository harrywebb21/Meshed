import { Profile } from "@/utils/supabase/types/dbTypes";
import Image from "next/image";
import { cn } from "@/utils/utils";

interface UserAvatarProps {
  user: Profile;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const profileColour = user.profile_colour || "bg-primary-gray-900";
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
          className={cn(
            `  ${profileColour} rounded-full w-8 h-8 flex items-center justify-center shadow-sm`
          )}
        >
          <p className="text-white text-sm font-bold  uppercase">
            {user.display_name?.charAt(0)}
          </p>
        </div>
      )}
    </div>
  );
}
