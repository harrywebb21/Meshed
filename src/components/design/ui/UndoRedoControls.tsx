interface UndoRedoControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  undoDescription?: string | null;
  redoDescription?: string | null;
}

export default function UndoRedoControls({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  undoDescription,
  redoDescription,
}: UndoRedoControlsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        title={undoDescription ? `Undo: ${undoDescription}` : 'Undo (Ctrl+Z)'}
        className={`
          px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-200
          ${canUndo 
            ? 'bg-primary-gray-900 text-white border-transparent hover:border-primary-green' 
            : 'bg-primary-gray-800 text-primary-gray-500 border-transparent cursor-not-allowed'
          }
        `}
      >
        ↶ Undo
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        title={redoDescription ? `Redo: ${redoDescription}` : 'Redo (Ctrl+Y)'}
        className={`
          px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-200
          ${canRedo 
            ? 'bg-primary-gray-900 text-white border-transparent hover:border-primary-green' 
            : 'bg-primary-gray-800 text-primary-gray-500 border-transparent cursor-not-allowed'
          }
        `}
      >
        ↷ Redo
      </button>
    </div>
  );
}