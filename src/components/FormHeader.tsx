
import React from 'react';
import { useForm } from '../contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const FormHeader = () => {
  const { state, dispatch } = useForm();

  const updateFormInfo = (updates: any) => {
    if (state.currentForm) {
      const updatedForm = { ...state.currentForm, ...updates };
      dispatch({ type: 'SET_CURRENT_FORM', payload: updatedForm });
    }
  };

  if (!state.currentForm) return null;

  return (
    <div className="bg-surface p-6 border-b border-border">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <Label className="text-text-primary mb-2 block font-medium">
            Form Name *
          </Label>
          <Input
            value={state.currentForm.name}
            onChange={(e) => updateFormInfo({ name: e.target.value })}
            placeholder="Enter form name..."
            className="bg-primary border-border text-text-primary text-lg font-semibold"
            required
          />
        </div>
        
        <div>
          <Label className="text-text-primary mb-2 block font-medium">
            Description (Optional)
          </Label>
          <Textarea
            value={state.currentForm.description}
            onChange={(e) => updateFormInfo({ description: e.target.value })}
            placeholder="Describe what this form is for..."
            className="bg-primary border-border text-text-primary"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
