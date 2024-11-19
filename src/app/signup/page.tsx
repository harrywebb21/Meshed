import GoogleButton from "@/components/Auth/GoogleAuth/GoogleButton";
import SignupForm from "@/components/Auth/signup/SignupForm";

export default function Signup() {
  return (
    <>
      <div className=" w-full h-svh flex flex-col items-center gap-4 justify-center">
        <SignupForm />
        <GoogleButton type="signup" />
      </div>
    </>
  );
}
