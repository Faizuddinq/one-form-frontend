
import React, { useEffect } from 'react';
import { useForm } from '../contexts/FormContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const UndoRedo = () => {
  const { state, dispatch } = useForm();

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          dispatch({ type: 'UNDO' });
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (canRedo) {
          dispatch({ type: 'REDO' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, dispatch]);

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => dispatch({ type: 'UNDO' })}
        disabled={!canUndo}
        className={`p-2 rounded-lg transition-colors ${
          canUndo
            ? 'text-text-primary hover:bg-border'
            : 'text-text-muted cursor-not-allowed'
        }`}
        title="Undo (Ctrl+Z)"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => dispatch({ type: 'REDO' })}
        disabled={!canRedo}
        className={`p-2 rounded-lg transition-colors ${
          canRedo
            ? 'text-text-primary hover:bg-border'
            : 'text-text-muted cursor-not-allowed'
        }`}
        title="Redo (Ctrl+Y)"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UndoRedo;
