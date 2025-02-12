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
  border: string;
};

export default function PresenceIndicators({
  workspaceId,
}: PresenceIndicatorProps) {
  const supabase = createClient();
  const authUser = useAuthUser();
  const userProfile = useGetProfile(authUser?.id).profile;
  const [joinedUsers, setJoinedUsers] = useState<PresenceState[]>([]);

  useEffect(() => {
    const tailwindBordersColors = [
      "border-red-500",
      "border-yellow-500",
      "border-green-500",
      "border-blue-500",
      "border-indigo-500",
      "border-purple-500",
      "border-pink-500",
    ];

    const randomTailwindBorder =
      tailwindBordersColors[
        Math.floor(Math.random() * tailwindBordersColors.length)
      ];

    if (!workspaceId || !userProfile) return;

    const channel = supabase.channel(`workspace:${workspaceId}`);

    // Update the list based on overall presence state
    const updatePresence = () => {
      const currentPresence = channel.presenceState();
      const users = Object.keys(currentPresence).map(
        (key) => currentPresence[key][0] as PresenceState
      );
      setJoinedUsers(users);
    };

    channel.on("presence", { event: "sync" }, updatePresence);
    channel.on("presence", { event: "join" }, updatePresence);
    // Optionally, handle leave events
    channel.on("presence", { event: "leave" }, updatePresence);

    // Subscribe to the channel and track presence automatically
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          joined: Date.now(),
          user: userProfile,
          border: randomTailwindBorder,
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
          randomTailwindBorder={user.border}
        />
      ))}
    </div>
  );
}
