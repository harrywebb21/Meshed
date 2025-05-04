/* eslint-disable @next/next/no-img-element */
import { Workspace } from "@/utils/supabase/types/dbTypes";
import { cn } from "@/utils/utils";
import Link from "next/link";
import Image from "next/image";
import { TbDotsVertical } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { IoIosClose } from "react-icons/io";
import { deleteWorkspace } from "@/utils/queries/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProjectCard({
  projectData,
}: Readonly<{
  projectData: Workspace;
}>) {
  const user = useGetProfile();
  const [isOwner, setIsOwner] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (projectData.owner_id !== user?.profile?.id) {
      setIsOwner(false);
    }
    if (projectData.owner_id === user?.profile?.id) {
      setIsOwner(true);
    }
  }, [projectData, user]);

  const handleShowDeleteModal = () => {
    setShowMenu(false);
    setShowDelete(true);
  };

  const deleteWorkspaceMutation = useMutation({
    mutationKey: ["deleteWorkspace"],
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      setShowDelete(false);
      setShowMenu(false);
    },
  });

  const handleDeleteProject = () => {
    console.log("Deleting project with ID:", projectData.id);
    deleteWorkspaceMutation.mutate(projectData.id);
  };

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div className=" shadow-md  flex flex-col items-end max-h-56 bg-primary-gray-900 rounded-lg  min-h-fit border border-transparent hover:border-primary-green p-1">
        <Link
          href={`/design/${projectData.id}`}
          key={projectData.id}
          className="h-fit"
        >
          {projectData.preview_img ? (
            <Image
              src={projectData.preview_img ?? ""}
              alt=""
              width={300}
              height={160}
              className="w-full h-40 object-cover rounded-t-md"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
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
        </Link>
        <div className="bg-neutral-800 w-full p-2 rounded-b-md shadow-md relative">
          <Link
            href={`/design/${projectData.id}`}
            key={projectData.id}
            className="h-fit w-full"
          >
            <h3 className="text-lg">{projectData.workspace_name}</h3>
          </Link>
          {isOwner && (
            <button
              className="absolute top-1/2 -translate-y-1/2 right-2 p-1 rounded-lg hover:bg-neutral-700 transition-colors duration-200 z-20"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <TbDotsVertical />
            </button>
          )}
          {showMenu && (
            <div className="absolute -top-2/3 -translate-y-1/2 right-2 bg-primary-gray-900 border border-primary-green rounded-lg shadow-md p-2 z-30">
              <button
                className="w-full text-left p-2 rounded-lg hover:bg-neutral-700 transition-colors duration-200"
                onClick={handleShowDeleteModal}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {showDelete && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center">
            <div className="bg-primary-gray-950 shadow-md p-2 rounded-lg min-w-96">
              <div className="bg-primary-gray-900 shadow-md p-4 rounded-lg flex flex-col gap-4 ">
                <div className="flex justify-between items-center ">
                  <h1 className="font-semibold text-lg ">Create Project</h1>
                  <button className=" " onClick={() => setShowDelete(false)}>
                    <IoIosClose
                      className=" hover:text-primary-green"
                      size={32}
                    />
                  </button>
                </div>
                <p className="text-sm text-neutral-400">
                  Are you sure you want to delete this project? This action
                  cannot be undone.
                </p>
                <div className="flex w-full items-center justify-center gap-4 ">
                  <button
                    className="bg-primary-gray-950 w-full text-white p-1 rounded-md border border-transparent hover:border-primary-green transition-colors"
                    onClick={() => {
                      setShowDelete(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary-gray-950 w-full text-white p-1 rounded-md border border-transparent hover:border-primary-green transition-colors"
                    onClick={handleDeleteProject}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
