"use client";
import SignoutButton from "@/components/Auth/signout/SignoutButton";
import CreateProjectButton from "@/components/dashboard/buttons/CreateProjectButton";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import ProjectSection from "@/components/dashboard/projects/ProjectSection";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";

export default function Dashboard() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id ?? "");

  return (
    <>
      <DashboardWrapper>
        <CreateProjectButton ownerId={profile?.id ?? ""} />
        <SignoutButton />
        <ProjectSection />
      </DashboardWrapper>
    </>
  );
}
