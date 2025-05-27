
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'email' | 'number';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  options?: string[];
  helpText?: string;
  step?: number;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  steps: FormStep[];
  settings: {
    multiStep: boolean;
    showProgressBar: boolean;
    allowEdit: boolean;
  };
}

export interface FormResponse {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
  userAgent?: string;
}

interface FormState {
  currentForm: FormTemplate | null;
  selectedField: FormField | null;
  currentStep: number;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  isDarkMode: boolean;
  forms: FormTemplate[];
  responses: FormResponse[];
  history: FormTemplate[];
  historyIndex: number;
}

type FormAction =
  | { type: 'SET_CURRENT_FORM'; payload: FormTemplate }
  | { type: 'ADD_FIELD'; payload: { stepId: string; field: FormField } }
  | { type: 'UPDATE_FIELD'; payload: { fieldId: string; updates: Partial<FormField> } }
  | { type: 'DELETE_FIELD'; payload: { fieldId: string } }
  | { type: 'REORDER_FIELDS'; payload: { stepId: string; fromIndex: number; toIndex: number } }
  | { type: 'SELECT_FIELD'; payload: FormField | null }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_PREVIEW_MODE'; payload: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_STEP'; payload: FormStep }
  | { type: 'UPDATE_STEP'; payload: { stepId: string; updates: Partial<FormStep> } }
  | { type: 'DELETE_STEP'; payload: string }
  | { type: 'SAVE_FORM'; payload: FormTemplate }
  | { type: 'LOAD_FORMS'; payload: FormTemplate[] }
  | { type: 'ADD_RESPONSE'; payload: FormResponse }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_TO_HISTORY' };

const initialState: FormState = {
  currentForm: null,
  selectedField: null,
  currentStep: 0,
  previewMode: 'desktop',
  isDarkMode: true,
  forms: [],
  responses: [],
  history: [],
  historyIndex: -1,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_CURRENT_FORM':
      return { ...state, currentForm: action.payload, currentStep: 0 };
    
    case 'ADD_FIELD': {
      if (!state.currentForm) return state;
      const updatedSteps = state.currentForm.steps.map(step =>
        step.id === action.payload.stepId
          ? { ...step, fields: [...step.fields, action.payload.field] }
          : step
      );
      return {
        ...state,
        currentForm: { ...state.currentForm, steps: updatedSteps }
      };
    }
    
    case 'UPDATE_FIELD': {
      if (!state.currentForm) return state;
      const updatedSteps = state.currentForm.steps.map(step => ({
        ...step,
        fields: step.fields.map(field =>
          field.id === action.payload.fieldId
            ? { ...field, ...action.payload.updates }
            : field
        )
      }));
      return {
        ...state,
        currentForm: { ...state.currentForm, steps: updatedSteps }
      };
    }
    
    case 'DELETE_FIELD': {
      if (!state.currentForm) return state;
      const updatedSteps = state.currentForm.steps.map(step => ({
        ...step,
        fields: step.fields.filter(field => field.id !== action.payload.fieldId)
      }));
      return {
        ...state,
        currentForm: { ...state.currentForm, steps: updatedSteps },
        selectedField: state.selectedField?.id === action.payload.fieldId ? null : state.selectedField
      };
    }
    
    case 'REORDER_FIELDS': {
      if (!state.currentForm) return state;
      const updatedSteps = state.currentForm.steps.map(step => {
        if (step.id === action.payload.stepId) {
          const newFields = [...step.fields];
          const [movedField] = newFields.splice(action.payload.fromIndex, 1);
          newFields.splice(action.payload.toIndex, 0, movedField);
          return { ...step, fields: newFields };
        }
        return step;
      });
      return {
        ...state,
        currentForm: { ...state.currentForm, steps: updatedSteps }
      };
    }
    
    case 'SELECT_FIELD':
      return { ...state, selectedField: action.payload };
    
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'SET_PREVIEW_MODE':
      return { ...state, previewMode: action.payload };
    
    case 'TOGGLE_THEME':
      return { ...state, isDarkMode: !state.isDarkMode };
    
    case 'ADD_STEP': {
      if (!state.currentForm) return state;
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          steps: [...state.currentForm.steps, action.payload]
        }
      };
    }
    
    case 'SAVE_FORM': {
      const existingIndex = state.forms.findIndex(f => f.id === action.payload.id);
      const updatedForms = existingIndex >= 0
        ? state.forms.map((f, i) => i === existingIndex ? action.payload : f)
        : [...state.forms, action.payload];
      return { ...state, forms: updatedForms };
    }
    
    case 'LOAD_FORMS':
      return { ...state, forms: action.payload };
    
    case 'ADD_RESPONSE':
      return { ...state, responses: [...state.responses, action.payload] };
    
    case 'SAVE_TO_HISTORY': {
      if (!state.currentForm) return state;
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(state.currentForm)));
      return {
        ...state,
        history: newHistory.slice(-50), // Keep last 50 states
        historyIndex: Math.min(newHistory.length - 1, 49)
      };
    }
    
    case 'UNDO': {
      if (state.historyIndex > 0) {
        const prevForm = state.history[state.historyIndex - 1];
        return {
          ...state,
          currentForm: prevForm,
          historyIndex: state.historyIndex - 1
        };
      }
      return state;
    }
    
    case 'REDO': {
      if (state.historyIndex < state.history.length - 1) {
        const nextForm = state.history[state.historyIndex + 1];
        return {
          ...state,
          currentForm: nextForm,
          historyIndex: state.historyIndex + 1
        };
      }
      return state;
    }
    
    default:
      return state;
  }
};

const FormContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
} | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedForms = localStorage.getItem('OneForm-forms');
    const savedResponses = localStorage.getItem('OneForm-responses');
    
    if (savedForms) {
      try {
        const forms = JSON.parse(savedForms);
        dispatch({ type: 'LOAD_FORMS', payload: forms });
      } catch (error) {
        console.error('Failed to load forms from localStorage:', error);
      }
    }
    
    if (savedResponses) {
      try {
        const responses = JSON.parse(savedResponses);
        responses.forEach((response: FormResponse) => {
          dispatch({ type: 'ADD_RESPONSE', payload: response });
        });
      } catch (error) {
        console.error('Failed to load responses from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage when forms or responses change
  useEffect(() => {
    localStorage.setItem('OneForm-forms', JSON.stringify(state.forms));
  }, [state.forms]);

  useEffect(() => {
    localStorage.setItem('OneForm-responses', JSON.stringify(state.responses));
  }, [state.responses]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
