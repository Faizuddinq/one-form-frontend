
import React from 'react';
import { useForm } from '../contexts/FormContext';
import FieldPreview from './FieldPreview';
import StepNavigator from './StepNavigator';
import FormHeader from './FormHeader';

const FormCanvas = () => {
  const { state, dispatch } = useForm();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');
    
    if (fieldType && state.currentForm) {
      const newField = {
        id: `field_${Date.now()}`,
        type: fieldType as any,
        label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
        placeholder: fieldType === 'select' ? undefined : `Enter your ${fieldType}...`,
        required: false,
        options: fieldType === 'select' || fieldType === 'radio' ? ['Option 1', 'Option 2'] : undefined,
        step: state.currentStep
      };

      const currentStepId = state.currentForm.steps[state.currentStep]?.id;
      if (currentStepId) {
        dispatch({
          type: 'ADD_FIELD',
          payload: { stepId: currentStepId, field: newField }
        });
        dispatch({ type: 'SAVE_TO_HISTORY' });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFieldReorder = (fromIndex: number, toIndex: number) => {
    if (!state.currentForm) return;
    
    const currentStepId = state.currentForm.steps[state.currentStep]?.id;
    if (currentStepId) {
      dispatch({
        type: 'REORDER_FIELDS',
        payload: { stepId: currentStepId, fromIndex, toIndex }
      });
      dispatch({ type: 'SAVE_TO_HISTORY' });
    }
  };

  if (!state.currentForm) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            Create Your First Form
          </h2>
          <p className="text-text-muted">
            Start by adding fields from the palette on the left
          </p>
        </div>
      </div>
    );
  }

  const currentStep = state.currentForm.steps[state.currentStep];
  const containerClass = state.previewMode === 'mobile' 
    ? 'max-w-sm mx-auto'
    : state.previewMode === 'tablet'
    ? 'max-w-2xl mx-auto'
    : 'max-w-4xl mx-auto';

  return (
    <div className="flex-1">
      <FormHeader />
      
      <div className="p-6">
        {state.currentForm.steps.length > 1 && <StepNavigator />}
        
        <div className={`${containerClass} transition-all duration-300`}>
          <div className="bg-surface rounded-xl p-8 border border-border min-h-96">
            {currentStep && (
              <div>
                {state.currentForm.steps.length > 1 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-text-primary mb-2">
                      {currentStep.title}
                    </h2>
                    {currentStep.description && (
                      <p className="text-text-muted">
                        {currentStep.description}
                      </p>
                    )}
                  </div>
                )}

                <div
                  className="space-y-6 min-h-64"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {currentStep.fields.length === 0 ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                      <div className="text-4xl mb-4">📋</div>
                      <p className="text-text-muted">
                        Drop fields here or click from the palette to add them
                      </p>
                    </div>
                  ) : (
                    currentStep.fields.map((field, index) => (
                      <FieldPreview 
                        key={field.id} 
                        field={field} 
                        index={index}
                        onReorder={handleFieldReorder}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCanvas;
