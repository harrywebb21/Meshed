"use client";
import Input from "@/components/design/ui/inputs/Input";
import Loader from "@/components/Loader";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteAccountModal from "@/components/Auth/DeleteAccountModal";
import ChangePasswordButton from "@/components/Auth/ChangePasswordButton";
import ChangeAvatar from "../ChangeAvatar";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/utils/queries/profile";
import Toast from "@/components/Toast";

export default function AccountSection() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);

  const router = useRouter();

  const [displayName, setDisplayName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [colour, setColour] = useState<string | null>("#05ff69");
  const [changeMade, setChangeMade] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | undefined>("");
  const [toastTitle, setToastTitle] = useState<string | undefined>("");
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const handleDisplayNameChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayName(e.target.value);
    setChangeMade(true);
  };
  const handleEmailChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEmail(e.target.value);
    setChangeMade(true);
  };
  // const handleColourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setColour(e.target.value);
  //   setChangeMade(true);
  // }

  const handleCancel = () => {
    if (!profile) return;
    setDisplayName(profile.display_name);
    setEmail(profile.email);
    setColour("#05ff69");
    setChangeMade(false);
  };

  const handleChangePassword = async () => {
    if (!user?.email || profile?.email_type === "google") return;
    router.push("/settings/change-password");
  };

  const saveProfileMutation = useMutation({
    mutationFn: (mutationData: {
      userId: string;
      displayName: string;
      email: string;
      colour: string | null;
    }) =>
      updateProfile(
        mutationData.userId,
        mutationData.displayName,
        mutationData.email,
        mutationData.colour
      ),
    mutationKey: ["updateProfile"],
    onSuccess: (data) => {
      if (data) {
        setChangeMade(false);
        router.push("/settings");
        setToastMessage(data.message);
        if (data.toastTitle) {
          setToastTitle(data.toastTitle);
        }
        setToastType("success");
      }
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const handleSave = async () => {
    if (!user?.id) return;
    if (!displayName || !email) return;

    if (profile?.email_type === "google") {
      setEmail(profile.email);
    }
    const mutationData = {
      userId: user.id,
      displayName: displayName,
      email: email,
      colour: colour,
    };
    setToastMessage("");
    setToastType(null);
    saveProfileMutation.mutate(mutationData);
    setChangeMade(false);
  };

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setEmail(profile.email);
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full h-full rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-semibold">Account</h1>
          <h2 className="text-md text-neutral-600">
            Manage your Meshed profile
          </h2>
        </div>
        {changeMade && (
          <div className="flex items-center justify-between p-4 gap-4 h-12">
            <button
              className="bg-neutral-800 text-sm w-32 h-10 rounded-lg shadow-md border border-transparent flex items-center justify-center gap-2 hover:bg-primary-gray-900 hover:border-neutral-800 transition-colors duration-200 ease-in-out"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="bg-neutral-800 text-sm w-32 h-10 rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-primary-green hover:text-primary-gray-950 transition-colors duration-200 ease-in-out"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
            <div className="flex w-full flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap items-center gap-2">
              <div className=" flex flex-col w-full">
                <p className=" px-1 text-lg font-semibold">Display Picture</p>
                <p className=" px-1 text-sm text-neutral-600">
                  Change your profile picture
                </p>
              </div>
              <ChangeAvatar />
            </div>
          </div>
          <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
            <div className="flex w-full flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap items-center gap-2">
              <div className=" flex flex-col w-full">
                <p className=" px-1 text-lg font-semibold">Theme Colour</p>
                <p className=" px-1 text-sm text-neutral-600">
                  Change your theme colour for Meshed
                </p>
              </div>
              <div className="w-56">
                <p className=" px-1 text-sm text-neutral-600">coming soon...</p>
                <Input
                  type="color"
                  disabled
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
              <div className="flex w-full flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap items-center gap-2">
                <div className=" flex flex-col w-full">
                  <p className=" px-1 text-lg font-semibold">Display Name</p>
                  <p className=" px-1 text-sm text-neutral-600">
                    This is how your name will appear on Meshed
                  </p>
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                  />
                </div>
              </div>
            </div>
            <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
              <div className="flex w-full flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap items-center gap-2">
                <div className=" flex flex-col  w-full">
                  <p className=" px-1 text-lg font-semibold">Email</p>
                  {profile.email_type === "google" ? (
                    <p className=" px-1 text-sm text-neutral-600">
                      Your email is handled by Google
                    </p>
                  ) : (
                    <p className=" px-1 text-sm text-neutral-600">
                      Change your email for your Meshed account
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    type="email"
                    disabled={profile.email_type === "google"}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
            <div className="flex w-full items-center gap-2">
              <div className=" flex flex-col w-full">
                <p className=" px-1 text-lg font-semibold">Password</p>
                <p className=" px-1 text-sm text-neutral-600">
                  {profile.email_type === "google"
                    ? "Your password is handled by Google"
                    : "Change your password for your Meshed account"}
                </p>
              </div>
              {profile.email_type === "google" ? null : (
                <div className="w-56">
                  <ChangePasswordButton onClick={handleChangePassword} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-primary-gray-900 w-full p-4 rounded-lg shadow-md">
          <div className="flex w-full items-center gap-2">
            <div className=" flex flex-col w-full">
              <p className=" px-1 text-lg font-semibold">Delete Account</p>
              <p className="px-1 text-neutral-600 text-sm">
                Permanently delete your account and all your data
              </p>
            </div>
            <div className="w-56">
              <DeleteAccountModal userId={user?.id} />
            </div>
          </div>
        </div>
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          title={toastTitle}
          onClose={() => {}}
        />
      )}
    </div>
  );
}
