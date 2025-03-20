import { IoClose } from "react-icons/io5";

interface ResetPasswordModalProps {
  onclick: () => void;
  onclickYes: () => void;
}

export default function ResetPasswordModal({
  onclick,
  onclickYes,
}: ResetPasswordModalProps) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center`}
    >
      <div className="bg-primary-gray-950 shadow-md p-2 rounded-lg min-w-[424px]">
        <div className="flex justify-between items-center  p-2">
          <h1 className="text-lg font-bold">Reset Password</h1>

          <button onClick={onclick}>
            <IoClose size={24} className=" hover:text-primary-green" />
          </button>
        </div>
        <div className="bg-primary-gray-900 shadow-md p-4 rounded-lg flex flex-col gap-4 ">
          <p className=" text-neutral-600">
            Are you sure you want to reset your password?
          </p>
          <div className="flex justify-center gap-4 w-full">
            <button
              className="w-full hover:border-primary-green hover:bg-primary-gray-900 bg-neutral-800 border border-transparent font-semibold text-sm px-4 py-2 rounded-lg"
              onClick={onclickYes}
            >
              Yes
            </button>
            <button
              className="w-full hover:border-red-500 hover:bg-primary-gray-900 bg-neutral-800 border border-transparent font-semibold text-sm px-4 py-2 rounded-lg"
              onClick={onclick}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
