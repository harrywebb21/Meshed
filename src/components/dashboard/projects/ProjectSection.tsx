import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { getWorkspaces } from "@/utils/queries/workspace";
import { Workspace } from "@/utils/supabase/types/dbTypes";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";

export default function ProjectSection() {
  const userId = useAuthUser();
  console.log("userId", userId);
  const { profile } = useGetProfile(userId?.id);
  console.log("profile", profile);

  const { data, error } = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: async () => getWorkspaces(profile!.id),
    enabled: !!profile?.id,
  });

  if (error) {
    console.error("Error fetching workspaces:", error);
  }
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex  flex-col gap-2 h-full w-full">
      <div className=" grid grid-flow-row sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4  h-full">
        {data.map((workspace) => (
          <ProjectCard key={workspace.id} projectData={workspace} />
        ))}
      </div>
    </div>
  );
}
