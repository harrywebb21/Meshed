import { Command } from './types';
import { Mesh } from '../supabase/types/dbTypes';
import { addMesh, deleteMesh, updateMesh } from '../queries/mesh';

export class AddMeshCommand implements Command {
  private mesh: Mesh;
  private workspaceId: string;
  private onSuccess?: () => void;

  constructor(mesh: Mesh, workspaceId: string, onSuccess?: () => void) {
    this.mesh = mesh;
    this.workspaceId = workspaceId;
    this.onSuccess = onSuccess;
  }

  async execute(): Promise<void> {
    await addMesh(this.mesh);
    this.onSuccess?.();
  }

  async undo(): Promise<void> {
    await deleteMesh(this.mesh.id);
    this.onSuccess?.();
  }

  getDescription(): string {
    return `Add ${this.mesh.type}`;
  }
}

export class DeleteMeshCommand implements Command {
  private mesh: Mesh;
  private onSuccess?: () => void;

  constructor(mesh: Mesh, onSuccess?: () => void) {
    this.mesh = mesh;
    this.onSuccess = onSuccess;
  }

  async execute(): Promise<void> {
    await deleteMesh(this.mesh.id);
    this.onSuccess?.();
  }

  async undo(): Promise<void> {
    await addMesh(this.mesh);
    this.onSuccess?.();
  }

  getDescription(): string {
    return `Delete ${this.mesh.layer_name}`;
  }
}

export class UpdateMeshCommand implements Command {
  private meshId: string;
  private oldData: Partial<Mesh>;
  private newData: Partial<Mesh>;
  private onSuccess?: () => void;

  constructor(
    meshId: string, 
    oldData: Partial<Mesh>, 
    newData: Partial<Mesh>, 
    onSuccess?: () => void
  ) {
    this.meshId = meshId;
    this.oldData = oldData;
    this.newData = newData;
    this.onSuccess = onSuccess;
  }

  async execute(): Promise<void> {
    await updateMesh(this.meshId, this.newData);
    this.onSuccess?.();
  }

  async undo(): Promise<void> {
    await updateMesh(this.meshId, this.oldData);
    this.onSuccess?.();
  }

  getDescription(): string {
    return `Update mesh properties`;
  }
}