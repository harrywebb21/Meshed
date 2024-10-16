"use client";
import { GlassBall } from "@/components/Models";
import Scene from "@/components/Scene";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className=" w-screen h-dvh flex flex-col items-center justify-center">
        <div className="absolute z-10 gap-2 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black">MESHED.ART</h1>
          <button
            onClick={() => router.push("/home")}
            className=" p-2 border rounded-xl"
          >
            Start Meshing
          </button>
        </div>
        <Scene>
          <GlassBall />
        </Scene>
      </div>
    </>
  );
}
