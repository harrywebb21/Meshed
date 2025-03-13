"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaLink } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Dropdown } from "./inputs/Input";
import { useMutation } from "@tanstack/react-query";
import { inviteWorkspaceUser } from "@/utils/queries/workspace";

interface ShareModalProps {
  onclick?: () => void;
  workspaceId: string | undefined;
}

export default function ShareModal({ onclick, workspaceId }: ShareModalProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [permissionType, setPermissionType] = useState("view");
  const [inviteMessage, setInviteMessage] = useState("");
  const [email, setEmail] = useState("");

  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyLink = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  const inviteMutation = useMutation({
    mutationFn: async (inviteData: {
      email: string;
      permissionType: string;
      workspaceId: string | undefined;
    }) => {
      await inviteWorkspaceUser(
        inviteData.workspaceId,
        inviteData.email,
        inviteData.permissionType
      );
    },
    onSuccess: () => {
      setEmail("");
      setPermissionType("");
      setInviteMessage("User invited successfully");
    },
    onError: (error) => {
      setInviteMessage(error.message);
    },
  });

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-primary-gray-950 shadow-md p-2 rounded-lg min-w-96">
        <div className="bg-primary-gray-900 shadow-md p-4 rounded-lg flex flex-col gap-4 ">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">Share Project</h1>

            <button onClick={onclick}>
              <IoClose size={24} className=" hover:text-primary-green" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCopyLink}
              className=" text-sm text-primary-green flex items-center gap-2 w-fit"
            >
              {isCopied ? (
                <p>Link copied!</p>
              ) : (
                <>
                  <FaLink /> <p>Copy link</p>
                </>
              )}
            </button>
            <div className="flex w-fit gap-2  ">
              <div
                className={`${
                  isFocused ? " border-primary-green " : " border-transparent"
                } bg-primary-gray-950 rounded-md flex items-center gap-2  w-full border`}
              >
                <input
                  type="email"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent p-1 outline-none text-white shadow-md w-full placeholder:text-neutral-700"
                  placeholder="Invite others by email"
                />
              </div>
              <div className="w-64">
                <Dropdown
                  value={permissionType}
                  options={[
                    { label: "edit", value: "edit" },
                    { label: "view", value: "view" },
                  ]}
                  onChange={(value) => {
                    setPermissionType(value);
                  }}
                />
              </div>

              <button
                className="bg-primary-green text-primary-gray-950 font-semibold text-sm px-4 rounded-lg"
                onClick={() => {
                  if (!email || !permissionType) {
                    setInviteMessage("Please fill in all fields");
                    return;
                  }
                  setInviteMessage("");
                  inviteMutation.mutate({ workspaceId, email, permissionType });
                }}
              >
                Invite
              </button>
            </div>
            {inviteMessage && (
              <p
                className={`${inviteMessage === "User invited successfully" ? "text-primary-green" : "text-red-500"}`}
              >
                {inviteMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
