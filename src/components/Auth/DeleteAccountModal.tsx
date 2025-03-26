"use client";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import deleteAccount from "./actions";
import Input from "../design/ui/inputs/Input";
import { useState } from "react";

interface DeleteAccountModalProps {
  userId: string | undefined;
}

export default function DeleteAccountModal({
  userId,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const [confirmPhrase, setConfirmPhrase] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteAccount = async () => {
    if (!userId || userId === undefined) return;
    const { success, error } = await deleteAccount(userId, confirmPhrase);

    if (success) {
      router.push("/");
    } else {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="w-full  hover:bg-red-500 bg-neutral-800 border border-transparent   text-sm px-4 py-2 rounded-lg transition-all"
        onClick={() => setIsOpen(true)}
      >
        Delete Account
      </button>
      {isOpen && (
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center`}
        >
          <div className="bg-primary-gray-950 shadow-md p-2 rounded-lg min-w-[424px]">
            <div className="flex justify-between items-center  p-2">
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">Delete Account</h1>
                <p className=" text-sm text-neutral-600">
                  Are you sure you want to reset your password?
                </p>
              </div>

              <button onClick={() => setIsOpen(false)}>
                <IoClose size={24} className=" hover:text-primary-green" />
              </button>
            </div>
            <div className="bg-primary-gray-900 shadow-md p-4 rounded-lg flex flex-col gap-4 ">
              <div className="flex flex-col justify-center gap-2 w-full">
                <p className=" text-neutral-600">
                  Type{" "}
                  <code className="italic text-red-500 bg-primary-gray-950 py-1 px-2  rounded-md">
                    DELETE MY ACCOUNT
                  </code>{" "}
                  to delete your Meshed account.
                </p>
                <p className="text-neutral-600 italic text-sm ">
                  Please note this action cannot be undone.
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={confirmPhrase}
                    onChange={(e) => {
                      setConfirmPhrase(e.target.value);
                    }}
                  />
                  <button
                    className="w-32 hover:border-primary-green hover:bg-primary-gray-900 bg-neutral-800 border border-transparent font-semibold text-sm px-4 py-2 rounded-lg"
                    onClick={handleDeleteAccount}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
