
import React, { useState } from 'react';
import { useForm, FormField } from '../contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FieldPreviewProps {
  field: FormField;
  index: number;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

const FieldPreview: React.FC<FieldPreviewProps> = ({ field, index, onReorder }) => {
  const { state, dispatch } = useForm();
  const [isDragging, setIsDragging] = useState(false);

  const handleFieldClick = () => {
    dispatch({ type: 'SELECT_FIELD', payload: field });
  };

  const handleFieldDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_FIELD', payload: { fieldId: field.id } });
    dispatch({ type: 'SAVE_TO_HISTORY' });
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('fieldIndex', index.toString());
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('fieldIndex'));
    if (fromIndex !== index) {
      onReorder(fromIndex, index);
    }
  };

  const isSelected = state.selectedField?.id === field.id;

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            className="bg-primary border-border text-text-primary"
            readOnly
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            className="bg-primary border-border text-text-primary"
            readOnly
          />
        );
      
      case 'date':
        return (
          <Input
            type="date"
            className="bg-primary border-border text-text-primary"
            readOnly
          />
        );
      
      case 'select':
        return (
          <Select disabled>
            <SelectTrigger className="bg-primary border-border text-text-primary">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`${field.id}-${index}`} disabled />
                <Label htmlFor={`${field.id}-${index}`} className="text-text-primary">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      
      case 'radio':
        return (
          <RadioGroup disabled>
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                <Label htmlFor={`${field.id}-${index}`} className="text-text-primary">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      className={`form-field cursor-pointer group relative ${isSelected ? 'selected' : ''} ${isDragging ? 'opacity-50' : ''}`}
      onClick={handleFieldClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-start mb-2">
        <Label className="text-text-primary font-medium flex items-center">
          <span className="mr-2 opacity-50 cursor-grab">⋮⋮</span>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        <button
          onClick={handleFieldDelete}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-all text-sm"
        >
          ✕
        </button>
      </div>
      
      {renderField()}
      
      {field.helpText && (
        <p className="text-sm text-text-muted mt-1">
          {field.helpText}
        </p>
      )}
      
      {isSelected && (
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-highlight rounded-full"></div>
      )}
    </div>
  );
};

export default FieldPreview;
