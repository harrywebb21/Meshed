"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaLink } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface ShareModalProps {
  onclick?: () => void;
}

export default function ShareModal({ onclick }: ShareModalProps) {
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

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-primary-gray-950 shadow-md p-4 rounded-lg flex flex-col gap-4">
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
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full bg-primary-gray-900 p-2 rounded-lg"
              placeholder="https://www.example.com"
            />
            <button className="bg-primary-green text-primary-gray-950 font-semibold px-4 rounded-lg">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
