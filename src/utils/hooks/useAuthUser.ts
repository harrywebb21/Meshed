"use client";
import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";

import { type User } from "@supabase/supabase-js";

const supabase = createClient();

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      } else if (isMounted && userData) {
        setUser(userData.user);
      }
    }
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);
  return user;
}
