"use client";
import GetStartedButton from "@/components/landing/buttons/getStarted/GetStartedButton";
import Scene from "@/components/Scene";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const MeshedModel = dynamic(() => import("@/components/landing/Model"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <div className=" w-screen h-dvh flex flex-col items-center justify-center">
      <div className="absolute z-10 gap-2 flex flex-col items-center justify-center  w-dvw h-dvh  p-4">
        <div className="flex gap-2">
          <h1 className="text-6xl font-black">MESHED</h1>
          <p className=" mt-3 px-2 py-1 h-fit rounded-full bg-primary-green text-primary-gray-950 text-[10px] font-semibold shadow-md">
            ALPHA
          </p>
        </div>
        <p className="text-center text-lg font-light max-w-2xl">
          Building in 3D together has never been easier!
        </p>
        <GetStartedButton />
      </div>
      <Scene>
        <Suspense fallback={null}>
          <MeshedModel />
        </Suspense>
      </Scene>
    </div>
  );
}
