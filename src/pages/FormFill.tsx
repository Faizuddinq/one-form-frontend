
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from '../contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateId } from '../utils/helpers';
import { toast } from '@/hooks/use-toast';

const FormFill = () => {
  const { formId } = useParams();
  const { state, dispatch } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const form = state.forms.find(f => f.id === formId);

  useEffect(() => {
    if (!form) {
      // In a real app, this would fetch from an API
      console.log('Form not found:', formId);
    }
  }, [form, formId]);

  if (!form) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Form Not Found</h1>
          <p className="text-text-muted mb-6">The form you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const currentStepData = form.steps[currentStep];
  const isLastStep = currentStep === form.steps.length - 1;
  const isFirstStep = currentStep === 0;

  const validateField = (field: any, value: any) => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `${field.label} must be at least ${field.validation.minLength} characters`;
      }
      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `${field.label} must not exceed ${field.validation.maxLength} characters`;
      }
      if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
        return `${field.label} format is invalid`;
      }
      if (field.type === 'number') {
        if (field.validation.min && value < field.validation.min) {
          return `${field.label} must be at least ${field.validation.min}`;
        }
        if (field.validation.max && value > field.validation.max) {
          return `${field.label} must not exceed ${field.validation.max}`;
        }
      }
    }

    return null;
  };

  const validateCurrentStep = () => {
    const stepErrors: Record<string, string> = {};
    
    currentStepData.fields.forEach(field => {
      const value = formData[field.id];
      const error = validateField(field, value);
      if (error) {
        stepErrors[field.id] = error;
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      const response = {
        id: generateId(),
        formId: form.id,
        data: formData,
        submittedAt: new Date(),
        userAgent: navigator.userAgent
      };

      dispatch({ type: 'ADD_RESPONSE', payload: response });
      
      toast({
        title: "Form Submitted!",
        description: "Thank you for your response.",
      });

      // Reset form
      setFormData({});
      setCurrentStep(0);
    }
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const renderField = (field: any) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`bg-surface border-border text-text-primary ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      
      case 'textarea':
        return (
          <div>
            <Textarea
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`bg-surface border-border text-text-primary ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      
      case 'date':
        return (
          <div>
            <Input
              type="date"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`bg-surface border-border text-text-primary ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      
      case 'select':
        return (
          <div>
            <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
              <SelectTrigger className={`bg-surface border-border text-text-primary ${error ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string, index: number) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div>
            <div className="space-y-2">
              {field.options?.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${field.id}-${index}`}
                    checked={(value || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValues = value || [];
                      const newValues = checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      handleFieldChange(field.id, newValues);
                    }}
                  />
                  <Label htmlFor={`${field.id}-${index}`} className="text-text-primary">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      
      case 'radio':
        return (
          <div>
            <RadioGroup value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
              {field.options?.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                  <Label htmlFor={`${field.id}-${index}`} className="text-text-primary">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-surface border-b border-border py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center space-x-2 text-text-primary hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-surface rounded-xl p-8 border border-border">
            {/* Form Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {form.name}
              </h1>
              {form.description && (
                <p className="text-text-muted">
                  {form.description}
                </p>
              )}
            </div>

            {/* Progress Bar */}
            {form.steps.length > 1 && (
              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-2">
                    {form.steps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            index === currentStep
                              ? 'bg-highlight text-white'
                              : index < currentStep
                              ? 'bg-accent text-white'
                              : 'bg-border text-text-muted'
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < form.steps.length - 1 && (
                          <div className={`w-8 h-0.5 ${index < currentStep ? 'bg-accent' : 'bg-border'}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="text-center text-text-muted">
                  Step {currentStep + 1} of {form.steps.length}
                </div>
              </div>
            )}

            {/* Current Step */}
            <div className="mb-8">
              {form.steps.length > 1 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    {currentStepData.title}
                  </h2>
                  {currentStepData.description && (
                    <p className="text-text-muted">
                      {currentStepData.description}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-6">
                {currentStepData.fields.map((field) => (
                  <div key={field.id}>
                    <Label className="text-text-primary font-medium mb-2 block">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {renderField(field)}
                    {field.helpText && (
                      <p className="text-sm text-text-muted mt-1">
                        {field.helpText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={isFirstStep}
                variant="outline"
                className={`flex items-center space-x-2 ${
                  isFirstStep ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {isLastStep ? (
                <Button onClick={handleSubmit} className="btn-primary">
                  Submit Form
                </Button>
              ) : (
                <Button onClick={handleNext} className="btn-primary">
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFill;
