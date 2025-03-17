"use client";
import SignoutButton from "@/components/Auth/signout/SignoutButton";
import Logo from "@/components/Logo";
import AccountSection from "@/components/settings/sections/Account";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";

export default function Page() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("account");
  const handleDashboardRedirect = () => {
    router.push("/dashboard");
  };
  return (
    <div className=" flex gap-4 items-center justify-center h-screen p-4">
      <div className="flex flex-col gap-4 rounded-lg p-4 w-fit h-full bg-primary-gray-950">
        <div className="flex flex-col h-full gap-4 justify-between ">
          <div className=" bg-primary-gray-900 shadow-md p-2 rounded-lg flex  items-center gap-2">
            <button onClick={handleDashboardRedirect}>
              <IoArrowBack size={16} className=" hover:text-primary-green" />
            </button>
            <h1 className=" text-xl font-semibold">Settings</h1>
          </div>
          <div className="flex flex-col gap-4 w-full h-full">
            <button
              className={` ${
                selectedTab === "account"
                  ? "border-primary-green"
                  : " border-transparent"
              } bg-primary-gray-900 p-2 rounded-lg shadow-md flex gap-2 items-center capitalize border`}
              onClick={() => {
                setSelectedTab("projects");
              }}
            >
              <FaRegUser className="text-sm" />
              <p className="text-md font-semibold">Account</p>
            </button>
          </div>
          <div className="w-full flex gap-4 items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <Logo green />
            </div>
            <div className="w-32">
              <SignoutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-lg p-4 w-full h-full bg-primary-gray-950">
        {selectedTab === "account" && <AccountSection />}
      </div>
    </div>
  );
}
