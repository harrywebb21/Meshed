"use client";

import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { createClient } from "@/utils/supabase/client";
import { Profile } from "@/utils/supabase/types/dbTypes";
import { useEffect, useState } from "react";
import UserAvatar from "./users/UserAvatar";

interface PresenceIndicatorProps {
  workspaceId: string | undefined;
}

type PresenceState = {
  presence_ref: string;
  user: Profile;
  joined: number;
  bg: string;
};

export default function PresenceIndicators({
  workspaceId,
}: PresenceIndicatorProps) {
  const supabase = createClient();
  const authUser = useAuthUser();
  const userProfile = useGetProfile(authUser?.id).profile;
  const [joinedUsers, setJoinedUsers] = useState<PresenceState[]>([]);

  useEffect(() => {
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

    if (!workspaceId || !userProfile) return;

    const channel = supabase.channel(`workspace:${workspaceId}`);

    // Update the list based on overall presence state
    const updatePresence = async () => {
      const currentPresence = channel.presenceState();
      const users = Object.keys(currentPresence).map(
        (key) => currentPresence[key][0] as PresenceState
      );

      setJoinedUsers(users);
    };

    channel.on("presence", { event: "sync" }, updatePresence);
    channel.on("presence", { event: "join" }, updatePresence);
    channel.on("presence", { event: "leave" }, updatePresence);

    // Subscribe to the channel and track presence automatically
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          joined: Date.now(),
          user: userProfile,
          bg: randomTailwindBG,
        });
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [workspaceId, userProfile, supabase]);

  return (
    <div className="flex -space-x-3 w-full">
      {joinedUsers.map((user) => (
        <UserAvatar
          key={user.user.id}
          user={user.user}
          randomTailwindColour={user.bg}
        />
      ))}
    </div>
  );
}
