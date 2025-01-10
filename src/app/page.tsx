import GetStartedButton from "@/components/landing/buttons/getStarted/GetStartedButton";
import { GlassBall } from "@/components/Models";
import Scene from "@/components/Scene";

export default function Home() {
  return (
    <div className=" w-screen h-dvh flex flex-col items-center justify-center">
      <div className="absolute z-10 gap-2 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-black">MESHED.ART</h1>
        <GetStartedButton />
        {/* 
          <p>COMING SOON</p> */}
      </div>
      <Scene>
        <GlassBall position={[-2, 0, 3]} />
      </Scene>
    </div>
  );
}
