"use client";
import Toast from "@/components/Toast";
import { useAuthUser } from "@/utils/hooks/useAuthUser";
import { useGetProfile } from "@/utils/hooks/useGetProfile";
import { createWorkspace } from "@/utils/queries/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
// import { FaPlus } from "react-icons/fa";
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
        className="shadow-md flex items-center gap-2 py-3 px-4 rounded-xl bg-primary-green "
        onClick={() => setModalOpen(!modalOpen)}
      >
        {/* <FaPlus className=" text-black text-sm" /> */}
        <p className="text-black font-semibold text-sm">New Project</p>
      </button>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md gap-4 flex flex-col">
            <div className="flex gap-8 items-center">
              <h1 className="font-black text-2xl text-black">Create Project</h1>
              <button
                className=" p-2 rounded-full bg-black shadow-md"
                onClick={() => setModalOpen(false)}
              >
                <IoIosClose />
              </button>
            </div>
            <form
              className=" flex flex-col gap-2"
              onSubmit={handleCreateWorkspace}
            >
              <input
                type="text"
                placeholder="Project Name"
                className="w-full p-2 rounded-md outline focus-within:outline-2 text-black"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
              <button
                className="bg-black text-white p-2 rounded-md"
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
