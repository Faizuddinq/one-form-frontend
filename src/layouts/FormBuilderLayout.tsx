
import React from 'react';
import FormBuilderHeader from '../components/FormBuilderHeader';

interface FormBuilderLayoutProps {
  children: React.ReactNode;
}

const FormBuilderLayout: React.FC<FormBuilderLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary">
      <FormBuilderHeader />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default FormBuilderLayout;
