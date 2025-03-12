import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { getSharedWorkspaces, getWorkspaces } from "@/utils/queries/workspace";
import { Workspace } from "@/utils/supabase/types/dbTypes";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import Logo from "@/components/Logo";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function ProjectSection() {
  const userId = useAuthUser();

  const profile = useGetProfile(userId?.id);
  const [selectedTab, setSelectedTab] = useState("projects");

  const { data, error } = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: async () => getWorkspaces(profile.profile!.id),
    enabled: !!profile.profile?.id,
  });

  const { data: sharedProjects } = useQuery<Workspace[]>({
    queryKey: ["sharedProjects"],
    queryFn: async () => getSharedWorkspaces(profile.profile!.id),
    enabled: !!userId,
  });

  if (error) {
    console.error("Error fetching workspaces:", error);
  }
  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full gap-4 overflow-hidden">
      <div className=" min-w-56 bg-primary-gray-950 rounded-xl shadow-md flex flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          <button
            className={` ${
              selectedTab === "projects"
                ? "border-primary-green"
                : " border-transparent"
            } bg-primary-gray-900 p-2 rounded-lg shadow-md flex gap-2 items-center capitalize border`}
            onClick={() => {
              setSelectedTab("projects");
            }}
          >
            my projects
          </button>
          <button
            className={` ${
              selectedTab === "shared"
                ? "border-primary-green"
                : " border-transparent"
            } bg-primary-gray-900 p-2 rounded-lg shadow-md flex gap-2 items-center capitalize border`}
            onClick={() => {
              setSelectedTab("shared");
            }}
          >
            shared with me
          </button>
        </div>
        <Logo className="w-12 " green />
      </div>
      <div className=" w-full overflow-auto">
        <div className="flex  flex-col gap-2 h-full w-full pr-4 p-2 shadow-md bg-primary-gray-950 rounded-xl">
          <div className=" grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  h-full ">
            {selectedTab === "projects" && (
              <>
                {data.map((workspace) => (
                  <ProjectCard key={workspace.id} projectData={workspace} />
                ))}
              </>
            )}
            {selectedTab === "shared" && (
              <>
                {sharedProjects?.map((workspace) => (
                  <ProjectCard key={workspace.id} projectData={workspace} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
