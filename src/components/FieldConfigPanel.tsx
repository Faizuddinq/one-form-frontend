import React from 'react';
import { useForm } from '../contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const FieldConfigPanel = () => {
  const { state, dispatch } = useForm();
  
  if (!state.selectedField) return null;

  const field = state.selectedField;

  const updateField = (updates: any) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { fieldId: field.id, updates }
    });
    
    // Update the selected field state as well to keep UI in sync
    dispatch({
      type: 'SELECT_FIELD',
      payload: { ...field, ...updates }
    });
  };

  const addOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    updateField({ options: newOptions });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = value;
    updateField({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = field.options?.filter((_, i) => i !== index);
    updateField({ options: newOptions });
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">
        Field Configuration
      </h3>

      <div className="space-y-6">
        {/* Field Label */}
        <div>
          <Label className="text-text-primary mb-2 block">Field Label</Label>
          <Input
            value={field.label || ''}
            onChange={(e) => updateField({ label: e.target.value })}
            className="bg-primary border-border text-text-primary"
          />
        </div>

        {/* Placeholder */}
        {field.type !== 'select' && field.type !== 'checkbox' && field.type !== 'radio' && (
          <div>
            <Label className="text-text-primary mb-2 block">Placeholder</Label>
            <Input
              value={field.placeholder || ''}
              onChange={(e) => updateField({ placeholder: e.target.value })}
              className="bg-primary border-border text-text-primary"
            />
          </div>
        )}

        {/* Help Text */}
        <div>
          <Label className="text-text-primary mb-2 block">Help Text</Label>
          <Textarea
            value={field.helpText || ''}
            onChange={(e) => updateField({ helpText: e.target.value })}
            className="bg-primary border-border text-text-primary"
            rows={2}
          />
        </div>

        {/* Required Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-text-primary">Required Field</Label>
          <Switch
            checked={field.required || false}
            onCheckedChange={(checked) => updateField({ required: checked })}
          />
        </div>

        {/* Options for select, checkbox, radio */}
        {(field.type === 'select' || field.type === 'checkbox' || field.type === 'radio') && (
          <div>
            <Label className="text-text-primary mb-2 block">Options</Label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={option || ''}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="bg-primary border-border text-text-primary flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addOption}
                className="w-full mt-2"
              >
                + Add Option
              </Button>
            </div>
          </div>
        )}

        {/* Validation */}
        {(field.type === 'text' || field.type === 'textarea' || field.type === 'email') && (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Validation</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-text-primary mb-2 block">Min Length</Label>
                <Input
                  type="number"
                  value={field.validation?.minLength || ''}
                  onChange={(e) => updateField({
                    validation: { ...field.validation, minLength: parseInt(e.target.value) || undefined }
                  })}
                  className="bg-primary border-border text-text-primary"
                />
              </div>
              
              <div>
                <Label className="text-text-primary mb-2 block">Max Length</Label>
                <Input
                  type="number"
                  value={field.validation?.maxLength || ''}
                  onChange={(e) => updateField({
                    validation: { ...field.validation, maxLength: parseInt(e.target.value) || undefined }
                  })}
                  className="bg-primary border-border text-text-primary"
                />
              </div>
            </div>

            <div>
              <Label className="text-text-primary mb-2 block">Pattern (Regex)</Label>
              <Input
                value={field.validation?.pattern || ''}
                onChange={(e) => updateField({
                  validation: { ...field.validation, pattern: e.target.value }
                })}
                className="bg-primary border-border text-text-primary"
                placeholder="e.g., ^[a-zA-Z]+$"
              />
            </div>
          </div>
        )}

        {/* Number validation */}
        {field.type === 'number' && (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Number Validation</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-text-primary mb-2 block">Minimum</Label>
                <Input
                  type="number"
                  value={field.validation?.min || ''}
                  onChange={(e) => updateField({
                    validation: { ...field.validation, min: parseInt(e.target.value) || undefined }
                  })}
                  className="bg-primary border-border text-text-primary"
                />
              </div>
              
              <div>
                <Label className="text-text-primary mb-2 block">Maximum</Label>
                <Input
                  type="number"
                  value={field.validation?.max || ''}
                  onChange={(e) => updateField({
                    validation: { ...field.validation, max: parseInt(e.target.value) || undefined }
                  })}
                  className="bg-primary border-border text-text-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldConfigPanel;
