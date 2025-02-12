interface ShareButtonProps {
  onclick?: () => void;
}

export default function ShareButton({ onclick }: ShareButtonProps) {
  return (
    <button
      className="shadow-md  font-semibold text-sm flex items-center gap-2 py-2 px-4 rounded-lg  bg-primary-green text-primary-gray-950 border border-transparent hover:bg-primary-gray-950 hover:text-white hover:border-primary-green transition-colors"
      onClick={onclick}
    >
      Share
    </button>
  );
}
