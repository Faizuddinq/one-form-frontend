
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface ThemeState {
  isDarkMode: boolean;
}

type ThemeAction = { type: 'TOGGLE_THEME' } | { type: 'SET_THEME'; payload: boolean };

const initialState: ThemeState = {
  isDarkMode: true,
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'SET_THEME':
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
} | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('OneForm-theme');
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme === 'dark' });
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('OneForm-theme', state.isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light');
  }, [state.isDarkMode]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
