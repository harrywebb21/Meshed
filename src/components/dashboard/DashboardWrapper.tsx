export default function DashboardWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" w-full h-svh flex  flex-col gap-2 bg-black/20 backdrop-blur-xl overflow-clip">
        <h1 className="font-black text-2xl">MESHED</h1>
        {children}
      </div>
    </>
  );
}
