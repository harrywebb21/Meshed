export default function ChangePasswordButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <>
      <button
        className="text-white text-sm text-nowrap hover:border-neutral-800 hover:bg-primary-gray-900 bg-neutral-800 border border-transparent rounded-lg shadow-md py-2 px-4 w-full flex items-center justify-center gap-2 transition-colors"
        onClick={onClick}
      >
        Change password
      </button>
    </>
  );
}
