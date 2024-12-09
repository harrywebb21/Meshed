import { Workspace } from "@/utils/supabase/types/dbTypes";
import Link from "next/link";

export default function ProjectCard({
  projectData,
}: Readonly<{
  projectData: Workspace;
}>) {
  return (
    <Link href={`/design/${projectData.id}`} key={projectData.id}>
      <div className=" shadow-md rounded-lg p-4 h-full border border-white/10 bg-primary-gray-950/10 min-h-48">
        <h3 className="text-lg  font-semibold">{projectData.workspace_name}</h3>
      </div>
    </Link>
  );
}
