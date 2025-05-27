
import React from 'react';
import { useForm } from '../contexts/FormContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StepNavigator = () => {
  const { state, dispatch } = useForm();

  if (!state.currentForm || state.currentForm.steps.length <= 1) {
    return null;
  }

  const canGoPrevious = state.currentStep > 0;
  const canGoNext = state.currentStep < state.currentForm.steps.length - 1;

  return (
    <div className="mb-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-2">
          {state.currentForm.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => dispatch({ type: 'SET_CURRENT_STEP', payload: index })}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  index === state.currentStep
                    ? 'bg-highlight text-white'
                    : index < state.currentStep
                    ? 'bg-accent text-white'
                    : 'bg-border text-text-muted'
                }`}
              >
                {index + 1}
              </button>
              {index < state.currentForm.steps.length - 1 && (
                <div className={`w-8 h-0.5 ${index < state.currentStep ? 'bg-accent' : 'bg-border'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 })}
          disabled={!canGoPrevious}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            canGoPrevious
              ? 'bg-surface border border-border text-text-primary hover:border-highlight/50'
              : 'bg-border text-text-muted cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 })}
          disabled={!canGoNext}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            canGoNext
              ? 'bg-accent text-white hover:bg-accent/90'
              : 'bg-border text-text-muted cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StepNavigator;
