
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../contexts/FormContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import FormBuilderLayout from '../layouts/FormBuilderLayout';
import FieldPalette from '../components/FieldPalette';
import FormCanvas from '../components/FormCanvas';
import FieldConfigPanel from '../components/FieldConfigPanel';
import { generateId } from '../utils/helpers';

const Builder = () => {
  const { formId } = useParams();
  const { state, dispatch } = useForm();

  useEffect(() => {
    if (formId && state.forms.length > 0) {
      const form = state.forms.find(f => f.id === formId);
      if (form) {
        dispatch({ type: 'SET_CURRENT_FORM', payload: form });
      }
    } else if (!state.currentForm) {
      // Create a new form
      const newForm = {
        id: generateId(),
        name: 'Untitled Form',
        description: 'A new form created with OneForm',
        steps: [{
          id: generateId(),
          title: 'Step 1',
          description: 'Form step',
          fields: []
        }],
        settings: {
          multiStep: false,
          showProgressBar: true,
          allowEdit: true
        }
      };
      dispatch({ type: 'SET_CURRENT_FORM', payload: newForm });
    }
  }, [formId, state.forms, state.currentForm, dispatch]);

  return (
    <ThemeProvider>
      <FormBuilderLayout>
        <div className="flex h-screen bg-primary pt-16">
          {/* Left Sidebar - Field Palette */}
          <div className="w-80 bg-surface border-r border-border overflow-y-auto">
            <FieldPalette />
          </div>

          {/* Main Canvas */}
          <div className="flex-1 flex">
            <div className="flex-1 overflow-y-auto">
              <FormCanvas />
            </div>

            {/* Right Sidebar - Field Configuration */}
            {state.selectedField && (
              <div className="w-80 bg-surface border-l border-border overflow-y-auto">
                <FieldConfigPanel />
              </div>
            )}
          </div>
        </div>
      </FormBuilderLayout>
    </ThemeProvider>
  );
};

export default Builder;
