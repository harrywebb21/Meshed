"use client";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { GoogleAuthProvider } from "firebase/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function loginWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;
        console.log("user: ", user);
        console.log("token: ", token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  function createAccount(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function signOut() {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log("error signing out", error);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user is signed in", user);
      } else {
        console.log("user is signed out");
      }
    });
  }, []);

  return (
    <>
      <button className="bg-red-500" onClick={signOut}>
        sign out
      </button>
      <div className=" flex flex-col p-6 w-96 h-96 gap-2 bg-neutral-600 rounded-xl">
        <h1>email</h1>
        <input
          className="text-black"
          type="text"
          onChange={(text) => {
            setEmail(text.target.value);
          }}
        />
        <h1>password</h1>
        <input
          className="text-black"
          type="password"
          onChange={(text) => {
            setPassword(text.target.value);
          }}
        />
        <button
          className=" bg-emerald-500"
          onClick={() => {
            createAccount(email, password);
          }}
        >
          create account
        </button>
        <button
          className=" bg-emerald-500"
          onClick={() => {
            loginWithGoogle();
          }}
        >
          login with google
        </button>
      </div>
    </>
  );
}
