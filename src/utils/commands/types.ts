export interface Command {
  execute(): Promise<void>;
  undo(): Promise<void>;
  getDescription(): string;
}

export interface CommandHistory {
  execute(command: Command): Promise<void>;
  undo(): Promise<void>;
  redo(): Promise<void>;
  canUndo(): boolean;
  canRedo(): boolean;
  clear(): void;
  getUndoDescription(): string | null;
  getRedoDescription(): string | null;
}