import Logo from "./Logo";

export default function Loader({
  w = "w-20",
  h = "h-20",
  logo = true,
}: {
  w?: string;
  h?: string;
  logo?: boolean;
}) {
  return (
    <div className={` ${w} ${h} relative flex items-center justify-center`}>
      <div className="loader-border relative w-full h-full p-2 items-center justify-center rounded-[50%] border-primary-green inline-block border-t-2 border-l border-l-transparent border-r-2 border-r-transparent box-border animate-spin " />
      {logo && (
        <div
          className={`w-12 aspect-square  flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <Logo green />
        </div>
      )}
    </div>
  );
}
