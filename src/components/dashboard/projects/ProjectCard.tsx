import { Workspace } from "@/utils/supabase/types/dbTypes";
import Link from "next/link";

export default function ProjectCard({
  projectData,
}: {
  projectData: Workspace;
}) {
  return (
    <>
      <Link href={`/design/${projectData.id}`} key={projectData.id}>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">
            {projectData.workspace_name}
          </h3>
        </div>
      </Link>
    </>
  );
}
