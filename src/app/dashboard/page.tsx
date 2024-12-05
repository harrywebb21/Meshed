"use client";
import SignoutButton from "@/components/Auth/signout/SignoutButton";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import ProjectSection from "@/components/dashboard/projects/ProjectSection";

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <SignoutButton />
      <ProjectSection />
    </DashboardWrapper>
  );
}
