
import React from 'react';
import { useForm } from '../contexts/FormContext';
import { generateId } from '../utils/helpers';
import TemplateSelectionModal from './TemplateSelectionModal';

const FieldPalette = () => {
  const { state, dispatch } = useForm();

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: '📝' },
    { type: 'textarea', label: 'Text Area', icon: '📄' },
    { type: 'email', label: 'Email', icon: '📧' },
    { type: 'number', label: 'Number', icon: '🔢' },
    { type: 'date', label: 'Date', icon: '📅' },
    { type: 'select', label: 'Dropdown', icon: '📋' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { type: 'radio', label: 'Radio Buttons', icon: '🔘' },
  ];

  const handleAddField = (type: any) => {
    if (!state.currentForm) return;

    const newField = {
      id: generateId(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: type === 'select' ? undefined : `Enter your ${type}...`,
      required: false,
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2'] : undefined,
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
  };

  return (
    <div className="p-6">
      {/* Quick Actions moved to top */}
      <div className="mb-6 p-4 bg-primary border border-border rounded-lg">
        <h3 className="font-medium text-text-primary mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              // Add new step
              const newStep = {
                id: generateId(),
                title: `Step ${state.currentForm?.steps.length! + 1}`,
                description: 'New form step',
                fields: []
              };
              dispatch({ type: 'ADD_STEP', payload: newStep });
            }}
            className="w-full text-left text-sm text-text-muted hover:text-accent transition-colors p-2 rounded hover:bg-border"
          >
            + Add New Step
          </button>
          <TemplateSelectionModal />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-text-primary mb-6">Field Palette</h2>
      
      <div className="space-y-3">
        {fieldTypes.map((fieldType) => (
          <button
            key={fieldType.type}
            onClick={() => handleAddField(fieldType.type)}
            className="w-full p-4 bg-primary border border-border rounded-lg hover:border-highlight/50 transition-all text-left group"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('fieldType', fieldType.type);
            }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{fieldType.icon}</span>
              <div>
                <div className="font-medium text-text-primary group-hover:text-accent transition-colors">
                  {fieldType.label}
                </div>
                <div className="text-sm text-text-muted">
                  Click or drag to add
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldPalette;
