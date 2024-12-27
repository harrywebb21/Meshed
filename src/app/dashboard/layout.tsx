import CreateProjectButton from "@/components/dashboard/buttons/CreateProjectButton";
import UserNameTag from "@/components/user/UserNameTag";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-svh gap-4 p-4 ">
      <div className="bg-primary-gray-950 w-full rounded-xl flex items-center justify-between p-3 border border-white/10 ">
        <UserNameTag />
        <CreateProjectButton />
      </div>
      <div className="flex  h-full w-full gap-4 overflow-hidden">
        <div className=" min-w-56 bg-primary-gray-950 rounded-xl border border-white/10"></div>
        <div className=" w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
