"use client";
import Toast from "@/components/Toast";
import { createWorkspace } from "@/utils/queries/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function CreateProjectButton({ ownerId }: { ownerId: string }) {
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
      ownerId: ownerId,
    });
    setModalOpen(false);
  }

  return (
    <>
      <button
        className="bg-black shadow-md border text-white p-2 rounded-md w-fit"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Create Project
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
