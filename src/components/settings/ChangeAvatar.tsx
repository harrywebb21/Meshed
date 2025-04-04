import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { updateProfileImage } from "@/utils/queries/profile";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import Toast from "../Toast";

export default function ChangeAvatar() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  useEffect(() => {
    if (profile) {
      setProfileImg(profile.profile_pic_url);
    }
  }, [profile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        try {
          await updateProfileImage(profile?.user_id, file);
          setProfileImg(URL.createObjectURL(file));
          setStatus("success");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center  h-full gap-4 ">
        <div className="flex items-center justify-center ">
          {profileImg ? (
            <div className="w-16 h-16 rounded-full overflow-hidden  shadow-md flex items-center justify-center relative">
              <Image
                src={profileImg}
                quality={100}
                alt="avatar"
                fill
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover"
                }} />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-gray-950 flex items-center justify-center shadow-md">
              <FaUser className=" text-3xl " />
            </div>
          )}
        </div>
        <button
          className="text-white w-48 text-sm text-nowrap hover:border-neutral-800 hover:bg-primary-gray-900 bg-neutral-800 border border-transparent rounded-lg shadow-md py-2 px-4  flex items-center justify-center gap-2 transition-colors"
          onClick={() => fileUploadRef.current?.click()}
        >
          Change Avatar
        </button>
        <input
          ref={fileUploadRef}
          type="file"
          className="hidden"
          accept="image/*"
          id="file-upload"
          onChange={handleFileChange}
        />
      </div>
      {status === "success" && (
        <Toast message="Avatar updated" type="success" />
      )}
    </>
  );
}
