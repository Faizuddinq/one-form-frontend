
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../contexts/FormContext';
import { useTheme } from '../contexts/ThemeContext';
import { ArrowLeft, Sun, Moon, LayoutDashboard } from 'lucide-react';
import ResponsivePreview from './ResponsivePreview';
import UndoRedo from './UndoRedo';
import FormShareModal from './FormShareModal';
import { useToast } from '@/hooks/use-toast';

const FormBuilderHeader = () => {
  const { state, dispatch } = useForm();
  const { state: themeState, dispatch: themeDispatch } = useTheme();
  const { toast } = useToast();

  const handleSaveForm = () => {
    if (state.currentForm) {
      dispatch({ type: 'SAVE_FORM', payload: state.currentForm });
      dispatch({ type: 'SAVE_TO_HISTORY' });
      toast({
        title: "Form Saved",
        description: "Your form has been saved successfully.",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-text-primary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>

          <div className="flex items-center space-x-2">
            <LayoutDashboard className="w-5 h-5 text-accent" />
            <span className="font-semibold text-text-primary">
              {state.currentForm?.name || 'Untitled Form'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <UndoRedo />
          <ResponsivePreview />
          
          <button
            onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })}
            className="p-2 rounded-lg hover:bg-border transition-colors"
            aria-label="Toggle theme"
          >
            {themeState.isDarkMode ? (
              <Sun className="w-5 h-5 text-text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-text-primary" />
            )}
          </button>

          <button
            onClick={handleSaveForm}
            className="btn-secondary"
          >
            Save
          </button>

          <FormShareModal />
        </div>
      </div>
    </header>
  );
};

export default FormBuilderHeader;
