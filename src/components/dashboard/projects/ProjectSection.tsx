import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { getWorkspaces } from "@/utils/queries/workspace";
import { Workspace } from "@/utils/supabase/types/dbTypes";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";

export default function ProjectSection() {
  const userId = useAuthUser();
  const profile = useGetProfile(userId?.id);

  const { data, error } = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: async () => getWorkspaces(profile.profile!.id),
    enabled: !!profile.profile?.id,
  });

  if (error) {
    console.error("Error fetching workspaces:", error);
  }
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex  flex-col gap-2 h-full w-full pr-4 p-2 shadow-md bg-primary-gray-950 rounded-xl">
      <div className=" grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  h-full ">
        {data.map((workspace) => (
          <ProjectCard key={workspace.id} projectData={workspace} />
        ))}
      </div>
    </div>
  );
}
