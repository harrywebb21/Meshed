"use client";

interface ResetPasswordButtonProps {
  onclick: () => void;
}

export default function ResetPasswordButton({
  onclick,
}: ResetPasswordButtonProps) {
  return (
    <>
      <button
        className="text-white hover:border-red-500 hover:bg-primary-gray-900 bg-neutral-800 border border-transparent rounded-lg shadow-md py-2 px-4 w-full flex items-center justify-center gap-2 transition-colors"
        onClick={onclick}
      >
        <p>Reset password</p>
      </button>
    </>
  );
}
