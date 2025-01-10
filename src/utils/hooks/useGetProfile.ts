"use client";
import { getProfile } from "@/utils/queries/profile";

import { useQuery } from "@tanstack/react-query";
import { Profile } from "../supabase/types/dbTypes";
import { useEffect, useState } from "react";
import { useAuthUser } from "./useAuthUser";

export function useGetProfile(userId?: string) {
  const user = useAuthUser();
  const [profile, setProfile] = useState<Profile | null>(null);

  if (!userId) {
    userId = user?.id;
  }

  const { data, error } = useQuery<Profile>({
    enabled: !!userId,
    queryKey: ["profile", profile?.id],
    queryFn: async () => getProfile(userId!),
  });

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  return { profile, error };
}
