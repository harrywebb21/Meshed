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
      <div className=" shadow-md  flex items-end max-h-56 bg-primary-gray-900 rounded-lg  min-h-56 border border-transparent hover:border-primary-green">
        <h3 className=" text-lg  bg-neutral-800 w-full p-2 rounded-lg shadow-md">
          {projectData.workspace_name}
        </h3>
      </div>
    </Link>
  );
}
