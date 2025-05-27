
import { FormField } from '../contexts/FormContext';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateField = (field: FormField, value: any): ValidationResult => {
  // Check if required field is empty
  if (field.required && (!value || value === '' || (Array.isArray(value) && value.length === 0))) {
    return {
      isValid: false,
      error: `${field.label} is required`
    };
  }

  // Skip validation if field is not required and empty
  if (!value || value === '') {
    return { isValid: true };
  }

  // Type-specific validation
  switch (field.type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return {
          isValid: false,
          error: 'Please enter a valid email address'
        };
      }
      break;

    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return {
          isValid: false,
          error: 'Please enter a valid number'
        };
      }
      
      if (field.validation?.min !== undefined && numValue < field.validation.min) {
        return {
          isValid: false,
          error: `Value must be at least ${field.validation.min}`
        };
      }
      
      if (field.validation?.max !== undefined && numValue > field.validation.max) {
        return {
          isValid: false,
          error: `Value must not exceed ${field.validation.max}`
        };
      }
      break;

    case 'text':
    case 'textarea':
      if (field.validation?.minLength && value.length < field.validation.minLength) {
        return {
          isValid: false,
          error: `Must be at least ${field.validation.minLength} characters`
        };
      }
      
      if (field.validation?.maxLength && value.length > field.validation.maxLength) {
        return {
          isValid: false,
          error: `Must not exceed ${field.validation.maxLength} characters`
        };
      }
      
      if (field.validation?.pattern) {
        try {
          const regex = new RegExp(field.validation.pattern);
          if (!regex.test(value)) {
            return {
              isValid: false,
              error: 'Invalid format'
            };
          }
        } catch (e) {
          console.warn('Invalid regex pattern:', field.validation.pattern);
        }
      }
      break;
  }

  return { isValid: true };
};

export const validateStep = (fields: FormField[], data: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  fields.forEach(field => {
    const result = validateField(field, data[field.id]);
    if (!result.isValid && result.error) {
      errors[field.id] = result.error;
    }
  });
  
  return errors;
};
