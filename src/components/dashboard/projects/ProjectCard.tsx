import { Workspace } from "@/utils/supabase/types/dbTypes";
import Link from "next/link";

export default function ProjectCard({
  projectData,
}: Readonly<{
  projectData: Workspace;
}>) {
  return (
    <Link
      href={`/design/${projectData.id}`}
      key={projectData.id}
      className="h-fit"
    >
      <div className=" shadow-md rounded-lg p-4 max-h-56 border border-white/10 bg-primary-gray-950/10 min-h-56">
        <h3 className="text-lg  font-semibold">{projectData.workspace_name}</h3>
      </div>
    </Link>
  );
}
