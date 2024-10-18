import { auth } from "@/app/firebase";
import { sessionAtom } from "@/lib/store";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";

export default function SignInModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setSession] = useAtom(sessionAtom);
  function loginWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;
        setSession(user);
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
        setSession(user);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => createAccount(email, password)}>
        Create Account
      </button>
      <button onClick={() => loginWithGoogle()}>Sign in with Google</button>
    </div>
  );
}
