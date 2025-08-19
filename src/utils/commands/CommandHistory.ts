import { Command, CommandHistory as ICommandHistory } from './types';

export class CommandHistory implements ICommandHistory {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  private maxHistorySize: number;

  constructor(maxHistorySize: number = 50) {
    this.maxHistorySize = maxHistorySize;
  }

  async execute(command: Command): Promise<void> {
    await command.execute();
    
    this.undoStack.push(command);
    this.redoStack = [];
    
    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift();
    }
  }

  async undo(): Promise<void> {
    if (!this.canUndo()) return;
    
    const command = this.undoStack.pop()!;
    await command.undo();
    this.redoStack.push(command);
  }

  async redo(): Promise<void> {
    if (!this.canRedo()) return;
    
    const command = this.redoStack.pop()!;
    await command.execute();
    this.undoStack.push(command);
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  getUndoDescription(): string | null {
    if (!this.canUndo()) return null;
    return this.undoStack[this.undoStack.length - 1].getDescription();
  }

  getRedoDescription(): string | null {
    if (!this.canRedo()) return null;
    return this.redoStack[this.redoStack.length - 1].getDescription();
  }
}