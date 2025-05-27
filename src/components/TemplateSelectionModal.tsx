
import React, { useState } from 'react';
import { useForm } from '../contexts/FormContext';
import { defaultTemplates, loadTemplate } from '../utils/formTemplates';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const TemplateSelectionModal = () => {
  const { dispatch } = useForm();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const template = loadTemplate(templateId);
    if (template) {
      dispatch({ type: 'SET_CURRENT_FORM', payload: template });
      dispatch({ type: 'SAVE_TO_HISTORY' });
      setIsOpen(false);
      toast({
        title: "Template Loaded",
        description: `${template.name} has been loaded successfully.`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          📋 Load Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-surface border-border p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-text-primary">Choose a Template</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6 pb-6">
          <div className="grid gap-4">
            {defaultTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 border border-border rounded-lg hover:border-highlight/50 cursor-pointer transition-all"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <h3 className="font-semibold text-text-primary mb-2">{template.name}</h3>
                <p className="text-text-muted text-sm mb-3">{template.description}</p>
                <div className="text-xs text-accent">
                  {template.steps[0].fields.length} fields included
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;
