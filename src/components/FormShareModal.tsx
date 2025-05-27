
import React, { useState } from 'react';
import { useForm } from '../contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const FormShareModal = () => {
  const { state } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  if (!state.currentForm) return null;

  const shareUrl = `${window.location.origin}/fill/${state.currentForm.id}`;
  const responsesUrl = `${window.location.origin}/responses/${state.currentForm.id}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary">
          Share Form
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-surface border-border text-text-primary">
        <DialogHeader>
          <DialogTitle className="text-text-primary">Share Your Form</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              Public Form URL
            </label>
            <div className="flex space-x-2">
              <Input
                value={shareUrl}
                readOnly
                className="bg-primary border-border text-text-primary"
              />
              <Button
                onClick={() => copyToClipboard(shareUrl)}
                variant="outline"
                className="border-border"
              >
                Copy
              </Button>
            </div>
            <p className="text-sm text-text-muted mt-1">
              Share this URL to collect responses
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              Responses Dashboard
            </label>
            <div className="flex space-x-2">
              <Input
                value={responsesUrl}
                readOnly
                className="bg-primary border-border text-text-primary"
              />
              <Button
                onClick={() => copyToClipboard(responsesUrl)}
                variant="outline"
                className="border-border"
              >
                Copy
              </Button>
            </div>
            <p className="text-sm text-text-muted mt-1">
              View and manage form responses
            </p>
          </div>

          <div className="bg-primary rounded-lg p-4 border border-border">
            <h4 className="font-medium text-text-primary mb-2">Form Settings</h4>
            <div className="text-sm text-text-muted space-y-1">
              <div>Fields: {state.currentForm.steps.reduce((acc, step) => acc + step.fields.length, 0)}</div>
              <div>Steps: {state.currentForm.steps.length}</div>
              <div>Multi-step: {state.currentForm.settings.multiStep ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormShareModal;
