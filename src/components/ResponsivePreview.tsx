
import React from 'react';
import { useForm } from '../contexts/FormContext';
import { LayoutDashboard } from 'lucide-react';

const ResponsivePreview = () => {
  const { state, dispatch } = useForm();

  const modes = [
    { key: 'desktop', label: 'Desktop', width: 'w-6' },
    { key: 'tablet', label: 'Tablet', width: 'w-5' },
    { key: 'mobile', label: 'Mobile', width: 'w-4' },
  ] as const;

  return (
    <div className="flex items-center space-x-1 bg-primary rounded-lg p-1 border border-border">
      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', payload: mode.key })}
          className={`p-2 rounded-md transition-colors ${
            state.previewMode === mode.key
              ? 'bg-accent text-white'
              : 'text-text-muted hover:text-text-primary'
          }`}
          title={mode.label}
        >
          <LayoutDashboard className={`h-4 ${mode.width}`} />
        </button>
      ))}
    </div>
  );
};

export default ResponsivePreview;
