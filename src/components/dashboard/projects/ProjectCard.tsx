/* eslint-disable @next/next/no-img-element */
import { Workspace } from "@/utils/supabase/types/dbTypes";
import { cn } from "@/utils/utils";
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
      <div className=" shadow-md  flex flex-col items-end max-h-56 bg-primary-gray-900 rounded-lg  min-h-fit border border-transparent hover:border-primary-green p-1">
        {projectData.preview_img?.signedUrl ? (
          <img
            src={projectData.preview_img?.signedUrl ?? ""}
            alt=""
            className="w-full h-40 object-cover rounded-t-md"
          />
        ) : (
          <div
            className={cn(
              `w-full h-40 rounded-t-md bg-gradient-to-r from-emerald-500 to-cyan-500 overflow-hidden flex items-end pl-1`
            )}
          >
            <p className="text-white/20  text-6xl  uppercase font-black">
              {projectData.workspace_name}
            </p>
          </div>
        )}
        <h3 className=" text-lg  bg-neutral-800 w-full p-2 rounded-b-md shadow-md">
          {projectData.workspace_name}
        </h3>
      </div>
    </Link>
  );
}
