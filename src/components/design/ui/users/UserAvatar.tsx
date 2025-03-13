import { Profile } from "@/utils/supabase/types/dbTypes";
import Image from "next/image";

interface UserAvatarProps {
  user: Profile;
  randomTailwindColour?: string;
}

export default function UserAvatar({
  user,
  randomTailwindColour,
}: UserAvatarProps) {
  if (!randomTailwindColour) {
    const tailwindBGColors = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
    ];

    const randomTailwindBG =
      tailwindBGColors[Math.floor(Math.random() * tailwindBGColors.length)];

    randomTailwindColour = randomTailwindBG;
  }
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
          className={`   ${randomTailwindColour} rounded-full w-8 h-8 flex items-center justify-center shadow-sm`}
        >
          <p className="text-white text-sm font-bold  uppercase">
            {user.display_name?.charAt(0)}
          </p>
        </div>
      )}
    </div>
  );
}
