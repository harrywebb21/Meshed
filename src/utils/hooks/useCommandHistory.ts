import { useState, useCallback, useRef, useEffect } from 'react';
import { CommandHistory } from '../commands/CommandHistory';
import { Command } from '../commands/types';

export function useCommandHistory(maxHistorySize: number = 50) {
  const commandHistory = useRef(new CommandHistory(maxHistorySize));
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [undoDescription, setUndoDescription] = useState<string | null>(null);
  const [redoDescription, setRedoDescription] = useState<string | null>(null);

  const updateState = useCallback(() => {
    setCanUndo(commandHistory.current.canUndo());
    setCanRedo(commandHistory.current.canRedo());
    setUndoDescription(commandHistory.current.getUndoDescription());
    setRedoDescription(commandHistory.current.getRedoDescription());
  }, []);

  const executeCommand = useCallback(async (command: Command) => {
    try {
      await commandHistory.current.execute(command);
      updateState();
    } catch (error) {
      console.error('Failed to execute command:', error);
      throw error;
    }
  }, [updateState]);

  const undo = useCallback(async () => {
    try {
      await commandHistory.current.undo();
      updateState();
    } catch (error) {
      console.error('Failed to undo:', error);
      throw error;
    }
  }, [updateState]);

  const redo = useCallback(async () => {
    try {
      await commandHistory.current.redo();
      updateState();
    } catch (error) {
      console.error('Failed to redo:', error);
      throw error;
    }
  }, [updateState]);

  const clearHistory = useCallback(() => {
    commandHistory.current.clear();
    updateState();
  }, [updateState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key === 'z') {
        event.preventDefault();
        if (canUndo) {
          undo();
        }
      } else if (
        ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'Z') ||
        ((event.ctrlKey || event.metaKey) && event.key === 'y')
      ) {
        event.preventDefault();
        if (canRedo) {
          redo();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  return {
    executeCommand,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
    undoDescription,
    redoDescription,
  };
}