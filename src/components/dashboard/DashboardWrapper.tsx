import { GlassBall } from "../Models";
import Scene from "../Scene";

export default function DashboardWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-svh opacity-25">
        <Scene>
          <GlassBall position={[0, 0, 0]} scale={2} />
        </Scene>
      </div>
      <div className=" w-full h-svh flex  flex-col gap-2 bg-black/20 backdrop-blur-xl overflow-clip">
        <h1 className="font-black text-2xl">MESHED</h1>
        {children}
      </div>
    </>
  );
}
