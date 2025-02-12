"use client";
import Input from "@/components/design/ui/inputs/Input";
import Toast from "@/components/Toast";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { createWorkspace } from "@/utils/queries/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

export default function CreateProjectButton() {
  const user = useAuthUser();
  const { profile } = useGetProfile(user?.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const queryClient = useQueryClient();
  const createWorkspaceMutation = useMutation({
    mutationKey: ["createWorkspace"],
    mutationFn: async (data: { workspaceName: string; ownerId: string }) =>
      await createWorkspace(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  function handleCreateWorkspace(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createWorkspaceMutation.mutate({
      workspaceName: workspaceName,
      ownerId: profile!.id,
    });
    setModalOpen(false);
  }

  return (
    <>
      <button
        className="shadow-md flex items-center gap-2 py-3 px-4 rounded-lg  bg-primary-gray-900 border border-transparent hover:bg-primary-gray-950 hover:border-primary-green transition-colors"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <FaPlus className="  text-sm" />
        <p className=" font-semibold text-sm">New Project</p>
      </button>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center">
          <div className="bg-primary-gray-950  min-w-80  rounded-md  flex flex-col">
            <div className="flex justify-between items-center  w-full p-4 rounded-lg shadow-md">
              <h1 className="font-semibold text-lg ">Create Project</h1>
              <button className=" " onClick={() => setModalOpen(false)}>
                <IoIosClose className=" hover:text-primary-green" size={32} />
              </button>
            </div>
            <form
              className=" flex flex-col gap-2 p-2"
              onSubmit={handleCreateWorkspace}
            >
              <Input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
              <button
                className="bg-primary-gray-950 text-white p-1 rounded-md border border-transparent hover:border-primary-green transition-colors"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      {createWorkspaceMutation.isSuccess && (
        <Toast
          message="Project Created"
          type="success"
          onClose={() => {
            console.log("close project creation modal");
          }}
        />
      )}
    </>
  );
}
