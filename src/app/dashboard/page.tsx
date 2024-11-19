import SignoutButton from "@/components/Auth/signout/SignoutButton";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className=" w-full h-svh flex items-center flex-col gap-2 ">
        <h1 className="font-black text-2xl">MESHED</h1>
        <p>Welcome, {user?.user_metadata.display_name}!</p>
        <SignoutButton />
      </div>
    </>
  );
}
