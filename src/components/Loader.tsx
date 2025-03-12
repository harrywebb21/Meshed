import Logo from "./Logo";

export default function Loader() {
  return (
    <div className="w-24 h-24 relative ">
      <div className="loader-border relative w-full h-full p-4 items-center justify-center rounded-[50%] border-primary-green inline-block border-t-2 border-l border-l-transparent border-r-2 border-r-transparent box-border animate-spin " />
      <div className="w-12 h-12  flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Logo green />
      </div>
    </div>
  );
}
