"use client";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import SignInModal from "@/components/signin/SignInModal";
import { useAtom } from "jotai";
import { sessionAtom } from "@/lib/store";
import { RESET } from "jotai/utils";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSession(user);
      }
      setLoading(false);
    });
  }, [setSession]);

  function signOut() {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
        setSession(RESET);
      })
      .catch((error) => {
        console.log("error signing out", error);
      });
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <button className="bg-red-500" onClick={signOut}>
        sign out
      </button>
      {!session && auth ? (
        <SignInModal />
      ) : (
        <div className=" flex flex-col p-6 w-96 h-96 gap-2 bg-neutral-600 rounded-xl">
          logged in
        </div>
      )}
    </>
  );
}
